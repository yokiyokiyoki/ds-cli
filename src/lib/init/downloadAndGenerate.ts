
const download = require('download-git-repo');  // 用于下载远程仓库至本地 支持GitHub、GitLab、Bitbucket
const exists = require('fs').existsSync;

const ora = require('ora');
const rm = require('rimraf').sync;

const path=require('path')


// 获取用户根目录，拼接一下用来存储下载的模板，然后用构建工具生成我们想要的模板
const home=require('user-home');

import logger from '../../utils/logger';
import generate from './generate';

export default function downloadAndGenerate(templateUrl,template,to,name) {
    // ds init webpack(template) testname(name)
    const spinner = ora('正在努力下载模板ing...');
    spinner.start();// 显示加载状态

    const tmp = path.join(home, '.ds-templates', template.replace(/[\/:]/g, '-'))  //远程模板下载到本地的路径,是~/.ds-template/..,这就是源文件

    if (exists(tmp)) rm(tmp);  // 是否存在该模板，存在就删除

    download(templateUrl,tmp, { clone:true }, err => {
      spinner.stop(); // 回调完了隐藏加载状态
      // 如果有错误，打印错误日志
      if (err) logger.fatal('拉取远程仓库失败 ' + template + ': ' + err.message.trim());
      // 渲染模板
      generate(name, tmp, to, err => {
        if (err) logger.fatal(err);
        logger.success(`生成${name}文件夹`);
      });
    });
}