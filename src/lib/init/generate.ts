import getOptions from './options';
const chalk = require('chalk');
const Metalsmith = require('metalsmith');
const Handlebars = require('handlebars');
const async = require('async');
const render = require('consolidate').handlebars.render;
const path = require('path');
const multimatch = require('multimatch');
import inquirer, { Answers, Questions } from 'inquirer';

// 注册handlebars的helper辅助函数
Handlebars.registerHelper('if_eq', function(a, b, opts) {
    return a === b
        ? opts.fn(this)
        : opts.inverse(this);
});

Handlebars.registerHelper('unless_eq', function(a, b, opts) {
    return a === b
        ? opts.inverse(this)
        : opts.fn(this);
});

/**
 * 生成模板
*/

export default async function generate(src: string, templateType: number, done) {

    const opts: any = getOptions(name,src);

    const metalsmith = Metalsmith(path.join(src, 'template'));

    

    Object.assign(metalsmith.metadata(), data);

    // 注册配置对象中的helper
    opts.helpers && Object.keys(opts.helpers).map(key => {
        Handlebars.registerHelper(key, opts.helpers[key]);
    });
}

