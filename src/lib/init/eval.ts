const chalk = require('chalk');

/**
 * Evaluate an expression in meta.json in the context of
 *  在data的作用域执行exp表达式并返回其执行得到的值
 */

export default function evaluate(exp, data) {
  const fn = new Function('data', 'with (data) { return ' + exp + '}');
  try {
    return fn(data);
  } catch (e) {
    console.error(chalk.red('执行meta的filter字段时候的错误' + exp));
  }
}