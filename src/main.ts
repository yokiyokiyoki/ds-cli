const cmd = require('commander');
const config = require('../package.json');

import init from './lib/init/cli-init';
import list from './lib/list/cli-list';

const command= {
    init,
    list
};

function exec(type, ...args) {
    config.debug = args[0].debug;
    command[type](...args);
}

cmd
  .usage('<command>')
  .version(config.version)
  .description('欢迎使用ds-cli');

cmd
  .command('init')
  .description('初始化组件模板')
  .action((...args) => exec('init', ...args));

cmd
  .command('list')
  .description('查看线上组件模板')
  .action((...args) => exec('list', ...args));

cmd.command('help')
  .description('查看帮助')
  .action(() => cmd.help());

// 解析输入的参数
cmd.parse(process.argv);
if (!cmd.args.length) {

  cmd.help();
}