
const logSymbols = require('log-symbols');
const chalk = require('chalk');
export default function(...args) {
    console.log(logSymbols.info,chalk.green('正在努力写'));
}