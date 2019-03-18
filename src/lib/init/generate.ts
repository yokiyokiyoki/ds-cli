import getOptions from './options';
const chalk = require('chalk');
const Metalsmith = require('metalsmith');
const Handlebars = require('handlebars');
const async = require('async');
const render = require('consolidate').handlebars.render;
const path = require('path');
const multimatch = require('multimatch');
import inquirer, { Answers, Questions } from 'inquirer';
import logger from '../../utils/logger'
import ask from "./ask"
import filter from "./filter"


// 注册handlebars的helper辅助函数
Handlebars.registerHelper('if_eq', function(a, b, opts) {
    return a === b
        ? opts.fn(this)
        : opts.inverse(this);
});

Handlebars.registerHelper('unless_eq', function(a, b, opts) {
    return a === b
        ? opts.inverse(this)
        : opts.fn(this);
});

/**
 * 生成模板
 * to是目标目录，templatePath:源文件绝对地址
 * 就是把一个文件构建打包到当前目录下
*/

export default async function generate(name:string,templatePath:string,to:string, done) {
    const opts = getOptions(name, templatePath) as meta  //获取meta.js配置
    //我们把所需文件放在源文件的template目录下，其他一些如测试放在外面。初始化一下metalsmith
    const metalsmith = Metalsmith(path.join(templatePath, 'template'));

    //添加一些元文件信息
    const data = Object.assign(metalsmith.metadata(), {
        destDirName: name,
        inPlace: to === process.cwd(),//是否是当前目录
    })

    // 注册配置对象中的helper
    opts.helpers && Object.keys(opts.helpers).map(key => {
        Handlebars.registerHelper(key, opts.helpers[key]);
    });

    //给一个辅助对象
    const helpers = { chalk, logger }

    //配置对象是否有before函数，是则执行
    if (opts.metalsmith && typeof opts.metalsmith.before === 'function') {
        opts.metalsmith.before(metalsmith, opts, helpers)
    }

    metalsmith.use(askQuestions(opts.prompts))  //询问问题
    .use(filterFiles(opts.filters))  //过滤文件
    .use(renderTemplateFiles(opts.skipInterpolation)) //渲染模板文件


    //配置对象是否有after函数，是则执行
    if (typeof opts.metalsmith === 'function') {
        opts.metalsmith(metalsmith, opts, helpers)
    } else if (opts.metalsmith && typeof opts.metalsmith.after === 'function') {
        opts.metalsmith.after(metalsmith, opts, helpers)
    }

    metalsmith.clean(false) 
    .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
    .destination(to)
    .build((err, files) => {
      done(err)
      if (typeof opts.complete === 'function') {
      //配置对象有complete函数则执行
        const helpers = { chalk, logger, files }
        opts.complete(data, helpers)
      } else {
      //配置对象有completeMessage，执行logMessage函数
        logMessage(opts.completeMessage, data)
      }
    })

    return data
}


/** 
 * 中间件
 * 转化prompts字段询问
*/
function askQuestions(prompts){
    return (files, metalsmith, done) => {
        ask(prompts, metalsmith.metadata(), done)
    }
}


/** 
 * 中间件
 * 过滤
*/

function filterFiles (filters) {
    return (files, metalsmith, done) => {
        filter(files, filters, metalsmith.metadata(), done)
    }
}

/** 
 * 中间件
 * 将模板中用handbars语法写的变量渲染出来
*/

function renderTemplateFiles(){
    return (files, metalsmith, done) => {
        const keys = Object.keys(files) //获取files的所有key
        const metalsmithMetadata = metalsmith.metadata() //获取metalsmith的所有变量
        //异步处理所有files
        async.each(keys, (file, next) => { 
            //获取文件的文本内容
            const str = files[file].contents.toString()
            // do not attempt to render files that do not have mustaches
            //跳过不符合handlebars语法的file
            if (!/{{([^{}]+)}}/g.test(str)) {  
              return next()
            }
            //渲染文件
            render(str, metalsmithMetadata, (err, res) => {
              if (err) {
                err.message = `[${file}] ${err.message}`
                return next(err)
              }
              files[file].contents = new Buffer(res)
              next()
            })
          }, done)
    }
}

function logMessage (message, data) {
    if (!message) return  //没有message直接退出函数
    render(message, data, (err, res) => {
      if (err) {
        console.error('\n模板渲染完成出错 ' + err.message.trim())  //渲染错误打印错误信息
      } else {
          //渲染成功打印最终渲染的结果
        console.log('\n' + res.split(/\r?\n/g).map(line => '   ' + line).join('\n'))
      }
    })
  }