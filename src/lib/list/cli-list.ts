
const logSymbols = require('log-symbols');
const chalk = require('chalk');
import tool from '../../utils/tool';

export default async function(...args) {
    console.log(logSymbols.info,chalk.green('正在努力写'));
    // 获取仓库列表
    const res=await tool.request({
        url: 'https://api.github.com/users/yokiyokiyoki/repos',
        method: 'GET'
        }
    );
    if(res.status===200) {
        console.log(res.data);
    } else {
        console.log(logSymbols.error,`获取仓库列表失败${res.data}`);
    }
}