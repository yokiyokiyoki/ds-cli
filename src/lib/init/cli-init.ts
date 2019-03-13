const cmd = require('commander');
const exists = require('fs').existsSync;
const inquirer = require('inquirer');
const path=require('path');
import logger from '../../utils/logger';
import checkVersion from '../../utils/check-version';

export default function(...args) {
    const template = args[0];  // 模板名称
    const rawName = args[1];  // 项目构建目录名
    const to = path.resolve(rawName || '.'); // 项目构建目录的绝对路径
    const inPlace = !rawName || rawName === '.';  // 没写或者“.”，表示当前目录下构建项目
    // 如果在当前目录下构建项目,当前目录名为项目构建目录名，否则是当前目录下的子目录【rawName】为项目构建目录名
    const name = inPlace ? path.relative('../', process.cwd()) : rawName;
    console.log(args,inPlace,args[0],args[1]);
    if (inPlace || exists(to)) {
        inquirer.prompt([{
            type: 'confirm',
            message: inPlace
            ? '在当前目录生成模板'
            : '目录已存在，是否继续？',
            name: 'ok'
        }]).then(answers => {
            if (answers.ok) {
                run();
            }
            }).catch(logger.fatal);
    } else {
        run();
    }
}

function run() {
    checkVersion(()=> {});
}