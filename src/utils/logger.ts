const chalk = require('chalk');
const format = require('util').format;

/**
 * Prefix.
 */

const prefix = '   ds-cli';
const sep = chalk.gray('·');

/**
 * 正常
 *
 * @param {String} message
 */

function log(...args) {
  const msg = format.apply(format, args);
  console.log(chalk.white(prefix), sep, msg);
}

/**
 * 打印错误消息并退出
 *
 * @param {String} message
 */

function fatal(...args) {
  if (args[0] instanceof Error) args[0] = args[0].message.trim();
  const msg = format.apply(format, args);
  console.error(chalk.red(prefix), sep, msg);
  // 退出当前进程
  process.exit(1);
}

/**
 * 打印成功
 *
 * @param {String} message
 */

function success(...args) {
  const msg = format.apply(format, args);
  console.log(chalk.green(prefix), sep, msg);
}

const logger= {
    log,
    fatal,
    success
};
export default logger;