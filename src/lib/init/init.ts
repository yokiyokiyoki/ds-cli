const cmd = require('commander');
const exists = require('fs').existsSync;
const inquirer = require('inquirer');
const path=require('path');

export default async function(...args) {

    const template = args[0];  // 模板名称
    const rawName = args[1];  // 项目构建目录名
    const to = path.resolve(rawName || '.'); // 项目构建目录的绝对路径
    const inPlace = !rawName || rawName === '.';  // 没写或者“.”，表示当前目录下构建项目
    console.log(args,inPlace);
    if (inPlace || exists(to)) {
        inquirer.prompt([{
            type: 'confirm',
            message: inPlace
            ? '在当前目录生成模板'
            : '目录已存在，是否继续？',
            name: 'ok'
        }]).then(answers => {
            if (answers.ok) {
                // run()
                console.log(answers);
            }
            }).catch();
    } else {
        // run()
    }
}