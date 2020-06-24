const cmd = require('commander');
const exists = require('fs').existsSync;
const inquirer = require('inquirer');
const path = require('path');
import localPath from './local-path';
import logger from '../../utils/logger';
import checkVersion from '../../utils/check-version';
import downloadAndGenerate from './downloadAndGenerate';
import generate from './generate';

export default function(...args) {
  const template = args[0]; // 模板名称
  const rawName = args[1]; // 项目构建目录名
  const to = path.resolve(rawName || '.'); // 项目构建目录的绝对路径(当前目录)
  const inPlace = !rawName || rawName === '.'; // 没写或者“.”，表示当前目录下构建项目
  // 如果在当前目录下构建项目,当前目录名为项目构建目录名，否则是当前目录下的子目录【rawName】为项目构建目录名
  // process.cwd()是当前工作目录
  const name = inPlace ? path.relative('../', process.cwd()) : rawName;

  if (inPlace || exists(to)) {
    inquirer
      .prompt([
        {
          type: 'confirm',
          message: inPlace ? '在当前目录生成模板' : '目录已存在，是否继续？',
          name: 'ok'
        }
      ])
      .then((answers) => {
        if (answers.ok) {
          run();
        }
      })
      .catch(logger.fatal);
  } else {
    run();
  }

  function run() {
    if (localPath.isLocalPath(template)) {
      // 支持本地文件模板，如ds init /usr/webpack test
      const templatePath = localPath.getTemplatePath(template);
      if (path.exists(templatePath)) {
        generate(name, templatePath, to, (err) => {
          if (err) logger.fatal(err);
          logger.success(`生成${name}文件夹`);
        });
      } else {
        logger.fatal(`本地模板${template}没有找到`);
      }
    } else {
      checkVersion(() => {
        // 例子ds init webpack testname
        const gitTemplateUrl = `direct:https://github.com/yokiyokiyoki/ds-cli-${template}-template#master`;
        downloadAndGenerate(gitTemplateUrl, template, to, name);
      });
    }
  }
}
