const cmd = require('commander');
const exists = require('fs').existsSync;
export default async function(...args) {

    const template = cmd.args[0];  // 模板名称
    const rawName = cmd.args[1];  // 项目构建目录名
    const inPlace = !rawName || rawName === '.';  // 没写或者“.”，表示当前目录下构建项目
    console.log(args,cmd.args);
    // if (inPlace || exists(to)) {
    //     inquirer.prompt([{
    //         type: 'confirm',
    //         message: inPlace
    //         ? 'Generate project in current directory?'
    //         : 'Target directory exists. Continue?',
    //         name: 'ok'
    //     }]).then(answers => {
    //         if (answers.ok) {
    //         run()
    //         }
    //     }).catch(logger.fatal)
    //     } else {
    //     run()
    // }
}