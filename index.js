#!/usr/bin/env node
// --这种用法是为了防止操作系统用户没有将node装在默认的/usr/bin路径里。当系统看到这一行的时候，
// 首先会到env设置里查找node的安装路径，再调用对应路径下的解释器程序完成操作。
const program = require("commander");
const download = require("download-git-repo");
const inquirer = require("inquirer");
const handlebars = require("handlebars");
const fs = require("fs");

program
  .version("1.0.0", "-v, --version")
  .command("init <name>")
  .action(name => {
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
            if (!err) {
              console.log("拉取成功");
              const meta = {
                name,
                description: answers.description,
                author: answers.author
              };
              const fileName = `${name}/package.json`;
              const content = fs.readFileSync(fileName).toString();
              const result = handlebars.compile(content)(meta);
              fs.writeFileSync(fileName, result);
            } else {
              console.log(`拉取远程仓库失败${err}`);
            }
          }
        );
      });
  });
program.parse(process.argv);
