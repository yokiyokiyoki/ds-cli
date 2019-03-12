const chalk = require('chalk');
const cmd = require('commander');
const config = require('../package.json');

import init from './lib/init';

const command= {
    init
};

function exec(type, ...args) {
    config.debug = args[0].debug;
    command[type](...args);
}

cmd
  .usage('<command>')
  .version(config.version)
  .description('欢迎使用数说方舟组件开发工具');

cmd
  .command('init')
  .description('初始化组件模板')
  .action((...args) => exec('init', ...args));

if (!cmd.args.length) {
    cmd.help();
}