
const logSymbols = require('log-symbols');
const chalk = require('chalk');
import tool from '../../utils/tool';

export default async function(...args) {

    // 获取仓库列表
    const res=await tool.request({
        url: 'https://api.github.com/users/yokiyokiyoki/repos',
        method: 'GET'
        }
    );
    let list;
    if(res.status===200) {
        console.log(logSymbols.info,chalk.green('共有下列模板'));
        list=res.data.filter((item)=> {
            return item.name.includes('ds-cli')&&item.name.includes('template');
        }).forEach(item=> {
            console.log();
            console.log(chalk.green(item.name));
        });
    } else {
        console.log(logSymbols.error,`获取仓库列表失败${res.data}`);
    }
}