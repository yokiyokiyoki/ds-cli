
const download = require('download-git-repo')  //用于下载远程仓库至本地 支持GitHub、GitLab、Bitbucket
const exists = require('fs').existsSync  
const path = require('path') //node自带的path模块，用于拼接路径
const ora = require('ora') 
const rm = require('rimraf').sync
const chalk = require('chalk')

//获取用户根目录，拼接一下用来存储下载的模板，然后用构建工具生成我们想要的模板
const home=require('user-home')

import logger from "../../utils/logger"
import generate from './generate'

export default function downloadAndGenerate (templateUrl,template,to,name) {
    //ds init webpack(template) testname(name)
    const spinner = ora('下载模板ing...')  
    spinner.start()//显示加载状态

    if (exists(template)) rm(template)  //是否存在该模板，存在就删除
      
    download(templateUrl,template, { clone:true }, err => {
      spinner.stop() //隐藏加载状态
      //如果有错误，打印错误日志
      if (err) logger.fatal('拉取远程仓库失败 ' + template + ': ' + err.message.trim())
      //渲染模板
      generate(name, template, to, err => {
        if (err) logger.fatal(err)
        logger.success('生成', name)
      })
    })
}