#!/usr/bin/env node
// --这种用法是为了防止操作系统用户没有将node装在默认的/usr/bin路径里。当系统看到这一行的时候，
// 首先会到env设置里查找node的安装路径，再调用对应路径下的解释器程序完成操作。
const program = require("commander");
const download = require("download-git-repo");
const inquirer = require("inquirer");
const handlebars = require("handlebars");
const fs = require("fs");
const ora = require("ora");
const chalk = require("chalk");
const symbols = require("log-symbols");

program
  .version("0.0.1", "-v, --version")
  .command("init <name>")
  .action(name => {
    if (fs.existsSync(name)) {
      // 错误提示项目已存在，避免覆盖原有项目
      console.log(symbols.error, chalk.red("项目已存在"));
      return;
    }
    inquirer
      .prompt([
        {
          name: "description",
          message: "请输入项目描述"
        },
        {
          name: "author",
          message: "请输入作者名称"
        }
      ])
      .then(answers => {
        download(
          "https://git.datatub.com:Uranus/general-template#master",
          name,
          { clone: true },
          err => {
            const spinner = ora("正在下载模板...");
            spinner.start();
            if (!err) {
              spinner.succeed();
              const meta = {
                name,
                description: answers.description,
                author: answers.author
              };
              const fileName = `${name}/package.json`;
              if (fs.existsSync(fileName)) {
                const content = fs.readFileSync(fileName).toString();
                const result = handlebars.compile(content)(meta);
                fs.writeFileSync(fileName, result);
              }
              console.log(symbols.success, chalk.green("项目初始化完成"));
            } else {
              spinner.fail();
              console.log(symbols.error, chalk.red(`拉取远程仓库失败${err}`));
            }
          }
        );
      });
  });
//解析命令行
program.parse(process.argv);
