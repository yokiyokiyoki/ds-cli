import getOptions from './options';
const chalk = require('chalk');
const Metalsmith = require('metalsmith');
const Handlebars = require('handlebars');
const async = require('async');
const render = require('consolidate').handlebars.render;
const path = require('path');
const multimatch = require('multimatch');
import inquirer, { Answers, Questions } from 'inquirer';



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
}

