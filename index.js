#!/usr/bin/env node
// --这种用法是为了防止操作系统用户没有将node装在默认的/usr/bin路径里。当系统看到这一行的时候，
// 首先会到env设置里查找node的安装路径，再调用对应路径下的解释器程序完成操作。
const program = require("commander");
const download = require("download-git-repo");

program
  .version("1.0.0", "-v, --version")
  .command("init <name>")
  .action(name => {
    download(
      "https://git.datatub.com:Uranus/general-template#master",
      name,
      { clone: true },
      err => {
        console.log(err ? "拉取远程仓库失败" : "拉取成功");
      }
    );
  });
program.parse(process.argv);
