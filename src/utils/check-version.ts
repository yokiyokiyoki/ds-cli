/***
 * 检查一下node版本
 * 获取一下ds-cli版本
 */

// 版本号处理
const semver=require('semver');
const path=require('path');
// 动态执行
const packageConfig = require('../package.json');

console.log(packageConfig);
const chalk = require('chalk');
import tool from './tool';

export default async (done)=> {
    if (!semver.satisfies(process.version, packageConfig.engines.node)) {
        return console.log(chalk.red(
            ' 你的node版本必须 >=' + packageConfig.engines.node + '.x 才能使用ds-cli'
        ));
    }
    const res=await tool.request({
        url: 'https://registry.npmjs.org/@datastory/ds-cli',
        method: 'GET'
        }
    );
    if(res.status===200) {
        const latestVersion = res.data['dist-tags'].latest;
        const localVersion = packageConfig.version;
        if (semver.lt(localVersion, latestVersion)) {
            console.log(chalk.yellow('有一个新的版本'));
            console.log();
            console.log('最新的是:' + chalk.green(latestVersion));
            console.log('下载的是:' + chalk.red(localVersion));
            console.log();
        }
    }
    // console.log(res,res.data);
    // 执行回调
    done();
};