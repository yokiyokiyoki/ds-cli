#!/usr/bin/env node
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('child_process'), require('rimraf'), require('inquirer'), require('axios')) :
    typeof define === 'function' && define.amd ? define(['child_process', 'rimraf', 'inquirer', 'axios'], factory) :
    (global = global || self, factory(global.child_process, global.rm$1, global.inquirer$2, global.axios));
}(this, function (child_process, rm$1, inquirer$2, axios) { 'use strict';

    rm$1 = rm$1 && rm$1.hasOwnProperty('default') ? rm$1['default'] : rm$1;
    inquirer$2 = inquirer$2 && inquirer$2.hasOwnProperty('default') ? inquirer$2['default'] : inquirer$2;
    axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;

    var path = require('path');
    var localPath = {
        isLocalPath: function (templatePath) {
            // 判断是否是本地路径,uinx是以.或者/区分,windows是c:或者d:区分
            return /^[./]|(^[a-zA-Z]:)/.test(templatePath);
        },
        getTemplatePath: function (templatePath) {
            // 把路径化成绝对路径
            return path.isAbsolute(templatePath)
                ? templatePath
                : path.normalize(path.join(process.cwd(), templatePath));
        }
    };

    var chalk = require('chalk');
    var format = require('util').format;
    /**
     * Prefix.
     */
    var prefix = 'ds-cli';
    var sep = chalk.gray('·');
    /**
     * 正常
     *
     * @param {String} message
     */
    function log() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var msg = format.apply(format, args);
        console.log(chalk.white(prefix), sep, msg);
    }
    /**
     * 打印错误消息并退出
     *
     * @param {String} message
     */
    function fatal() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args[0] instanceof Error)
            args[0] = args[0].message.trim();
        var msg = format.apply(format, args);
        console.error(chalk.red(prefix), sep, msg);
        // 退出当前进程
        process.exit(1);
    }
    /**
     * 打印成功
     *
     * @param {String} message
     */
    function success() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var msg = format.apply(format, args);
        console.log(chalk.green(prefix), sep, msg);
    }
    var logger = {
        log: log,
        fatal: fatal,
        success: success
    };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    // 开一个子进程执行
    var Tool = /** @class */ (function () {
        function Tool() {
        }
        /**
       * 删除文件
       * @param path
       * @return {Promise<any>}
       */
        Tool.prototype.remove = function (path) {
            return new Promise(function (resolve, reject) {
                rm$1(path, function (err) {
                    if (err) {
                        reject({ type: 'remove', msg: err });
                    }
                    else {
                        resolve();
                    }
                });
            });
        };
        /**
         * 执行 Shell 命令
         * @param cmd
         * @return {Promise<any>}
         */
        Tool.prototype.shell = function (cmd) {
            return new Promise(function (resolve, reject) {
                child_process.exec(cmd, function (err, stdout, stderr) {
                    if (err) {
                        reject({ type: 'shell', msg: stdout + stderr });
                    }
                    else {
                        resolve(stdout);
                    }
                });
            });
        };
        /**
         * 通过 inquirer 询问用户
         * @param config
         * @return {Promise<any>}
         */
        Tool.prototype.ask = function (config) {
            return new Promise(function (resolve, reject) {
                inquirer$2.prompt(config).then(function (answers) {
                    resolve(answers);
                });
            });
        };
        /**
         * ajax 请求接口
         * @param options
         * @return {Promise<any>}
         */
        Tool.prototype.request = function (options) {
            return new Promise(function (resolve, reject) {
                axios(options).then(function (response) {
                    resolve(response);
                })["catch"](function (err) {
                    reject({ type: 'ajax请求', msg: err });
                });
            });
        };
        return Tool;
    }());
    var tool = new Tool();

    /***
     * 检查一下node版本
     * 获取一下ds-cli版本
     */
    var _this = undefined;
    // 版本号处理
    var semver = require('semver');
    var path$1 = require('path');
    // 动态执行
    var packageConfig = require('../package.json');
    console.log(packageConfig);
    var chalk$1 = require('chalk');
    var checkVersion = (function (done) { return __awaiter(_this, void 0, void 0, function () {
        var res, latestVersion, localVersion;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!semver.satisfies(process.version, packageConfig.engines.node)) {
                        return [2 /*return*/, console.log(chalk$1.red(' 你的node版本必须 >=' + packageConfig.engines.node + '.x 才能使用ds-cli'))];
                    }
                    return [4 /*yield*/, tool.request({
                            url: 'https://registry.npmjs.org/@datastory/ds-cli',
                            method: 'GET'
                        })];
                case 1:
                    res = _a.sent();
                    if (res.status === 200) {
                        latestVersion = res.data['dist-tags'].latest;
                        localVersion = packageConfig.version;
                        if (semver.lt(localVersion, latestVersion)) {
                            console.log(chalk$1.yellow('有一个新的版本'));
                            console.log();
                            console.log('最新的是:' + chalk$1.green(latestVersion));
                            console.log('下载的是:' + chalk$1.red(localVersion));
                            console.log();
                        }
                    }
                    // console.log(res,res.data);
                    // 执行回调
                    done();
                    return [2 /*return*/];
            }
        });
    }); });

    /**
     * 新开一个shell获取git邮箱，名字
     * 返回 姓名<邮箱>
    */
    var exec = require('child_process').execSync;
    var getGitUser = (function () {
        var name = '';
        var email = '';
        try {
            name = exec('git config --get user.name');
            email = exec('git config --get user.email');
        }
        catch (e) {
            console.log(e);
        }
        name = name && JSON.stringify(name.toString().trim()).slice(1, -1);
        email = email && (' <' + email.toString().trim() + '>');
        return (name || '') + (email || '');
    });

    // 获取配置
    var path$2 = require('path');
    // 获取json和yaml metadata返回obj
    var metadata = require('read-metadata');
    var exists = require('fs').existsSync;
    // 检查你输入的 app-name 是否符合 npm 包名命名规范
    var validateName = require('validate-npm-package-name');
    function options(name, dir) {
        var opts = getMetadata(dir);
        // 设置name字段并检测name是否合法
        setDefault(opts, 'name', name);
        setValidateName(opts);
        // 获取 name 和 email，用于生成 package.json 里面的 author 字段
        var author = getGitUser();
        if (author) {
            setDefault(opts, 'author', author);
        }
        return opts;
    }
    /**
     *
     * 获取meta files
     *
     * @param  {String} dir
     * @return {Object}
     */
    function getMetadata(dir) {
        // 获取模板目录下的meta，定制化需求
        var json = path$2.join(dir, 'meta.json');
        var js = path$2.join(dir, 'meta.js');
        var opts = {};
        if (exists(json)) {
            // 存在json的话，同步转换成obj
            opts = metadata.sync(json);
        }
        else if (exists(js)) {
            var req = require(path$2.resolve(js));
            if (req !== Object(req)) {
                throw new Error('meta.js 需要导出一个对象');
            }
            opts = req;
        }
        return opts;
    }
    /**
     * 向meta配置对象中添加一下默认字段
     *
     * @param {Object} opts
     * @param {String} key
     * @param {String} val
     */
    function setDefault(opts, key, val) {
        if (opts.schema) {
            opts.prompts = opts.schema;
            delete opts.schema;
        }
        var prompts = opts.prompts || (opts.prompts = {});
        if (!prompts[key] || typeof prompts[key] !== 'object') {
            prompts[key] = {
                type: 'string',
                "default": val
            };
        }
        else {
            prompts[key]["default"] = val;
        }
    }
    /**
     * 验证npm包名
    */
    function setValidateName(opts) {
        // 获取包名name
        var name = opts.prompts.name;
        var customValidate = name.validate;
        name.validate = function (name) {
            var its = validateName(name);
            if (!its.validForNewPackages) {
                var errors = (its.errors || []).concat(its.warnings || []);
                return 'Sorry, ' + errors.join(' and ') + '.';
            }
            if (typeof customValidate === 'function')
                return customValidate(name);
            return true;
        };
    }

    // 将meta.js或者meta.json中的prompts字段解析成对应的问题询问。
    var async = require('async');
    var inquirer = require('inquirer');
    var promptMapping = {
        string: 'input',
        boolean: 'confirm'
    };
    /**
     * 询问后返回result
     *
     * @param {Object} prompts
     * @param {Object} data
     * @param {Function} done
     */
    function ask(prompts, data, done) {
        async.eachSeries(Object.keys(prompts), function (key, next) {
            prompt(data, key, prompts[key], next);
        }, done);
    }
    /**
     * Inquirer prompt 包裹
     *
     * @param {Object} data
     * @param {String} key
     * @param {Object} prompt
     * @param {Function} done
     */
    function prompt(data, key, prompt, done) {
        // 删除了 prompts 中的 when 提示
        var promptDefault = prompt["default"];
        if (typeof prompt["default"] === 'function') {
            promptDefault = function () {
                return prompt["default"].bind(this)(data);
            };
        }
        inquirer.prompt([{
                type: promptMapping[prompt.type] || prompt.type,
                name: key,
                message: prompt.message || prompt.label || key,
                "default": promptDefault,
                choices: prompt.choices || [],
                validate: prompt.validate || (function () { return true; })
            }]).then(function (answers) {
            if (Array.isArray(answers[key])) {
                data[key] = {};
                answers[key].forEach(function (multiChoiceAnswer) {
                    data[key][multiChoiceAnswer] = true;
                });
            }
            else if (typeof answers[key] === 'string') {
                data[key] = answers[key].replace(/"/g, '\\"');
            }
            else {
                data[key] = answers[key];
            }
            done();
        })["catch"](done);
    }

    var chalk$2 = require('chalk');
    /**
     * Evaluate an expression in meta.json in the context of
     *  在data的作用域执行exp表达式并返回其执行得到的值
     */
    function evaluate(exp, data) {
        var fn = new Function('data', 'with (data) { return ' + exp + '}');
        try {
            return fn(data);
        }
        catch (e) {
            console.error(chalk$2.red('执行meta的filter的错误' + exp));
        }
    }

    /**
     * 根据metalsmith.metadata()删除一些不需要的模板文件，而metalsmith.metadata()主要在ask.ts中改变的
     * 也就是说ask.ts中获取到用户的需求。
    */
    // 字符匹配工具
    var match = require('minimatch');
    /**
     * files 模板内的所有文件
     * filters meta.js或者meta.json的filters字段
     * data metalsmith.metadata()
     * done  交于下一个metalsmith插件处理
     */
    var filter = (function (files, filters, data, done) {
        if (!filters) {
            // meta.js或者meta.json没有filters字段直接跳过交于下一个metalsmith插件处理
            return done();
        }
        // 获取所有文件的名字
        var fileNames = Object.keys(files);
        // 遍历meta.js或者meta.json没有filters下的所有字段
        Object.keys(filters).forEach(function (glob) {
            // 遍历所有文件名
            fileNames.forEach(function (file) {
                // 如果有文件名跟filters下的某一个字段匹配上
                if (match(file, glob, { dot: true })) {
                    var condition = filters[glob];
                    if (!evaluate(condition, data)) {
                        // 如果metalsmith.metadata()下condition表达式不成立，删除该文件
                        delete files[file];
                    }
                }
            });
        });
        done();
    });

    var chalk$3 = require('chalk');
    var Metalsmith = require('metalsmith');
    var Handlebars = require('handlebars');
    var async$1 = require('async');
    var render = require('consolidate').handlebars.render;
    var path$3 = require('path');
    // 注册handlebars的helper辅助函数
    Handlebars.registerHelper('if_eq', function (a, b, opts) {
        return a === b
            ? opts.fn(this)
            : opts.inverse(this);
    });
    Handlebars.registerHelper('unless_eq', function (a, b, opts) {
        return a === b
            ? opts.inverse(this)
            : opts.fn(this);
    });
    /**
     * 生成模板
     * to是目标目录，templatePath:源文件绝对地址
     * 就是把一个文件构建打包到当前目录下
    */
    function generate(name, templatePath, to, done) {
        return __awaiter(this, void 0, void 0, function () {
            var opts, metalsmith, data, helpers;
            return __generator(this, function (_a) {
                opts = options(name, templatePath);
                metalsmith = Metalsmith(path$3.join(templatePath, 'template'));
                data = Object.assign(metalsmith.metadata(), {
                    destDirName: name,
                    inPlace: to === process.cwd() // 是否是当前目录
                });
                // 注册配置对象中的helper
                opts.helpers && Object.keys(opts.helpers).map(function (key) {
                    Handlebars.registerHelper(key, opts.helpers[key]);
                });
                helpers = { chalk: chalk$3, logger: logger };
                // 配置对象是否有before函数，是则执行
                if (opts.metalsmith && typeof opts.metalsmith.before === 'function') {
                    opts.metalsmith.before(metalsmith, opts, helpers);
                }
                metalsmith.use(askQuestions(opts.prompts)) // 询问问题
                    .use(filterFiles(opts.filters)) // 过滤文件
                    .use(renderTemplateFiles()); // 渲染模板文件
                // 配置对象是否有after函数，是则执行
                if (typeof opts.metalsmith === 'function') {
                    opts.metalsmith(metalsmith, opts, helpers);
                }
                else if (opts.metalsmith && typeof opts.metalsmith.after === 'function') {
                    opts.metalsmith.after(metalsmith, opts, helpers);
                }
                metalsmith.clean(false)
                    .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
                    .destination(to)
                    .build(function (err, files) {
                    done(err);
                    if (typeof opts.complete === 'function') {
                        // 配置对象有complete函数则执行
                        var helpers_1 = { chalk: chalk$3, logger: logger, files: files };
                        opts.complete(data, helpers_1);
                    }
                    else {
                        // 配置对象有completeMessage，执行logMessage函数
                        logMessage(opts.completeMessage, data);
                    }
                });
                return [2 /*return*/, data];
            });
        });
    }
    /**
     * 中间件
     * 转化prompts字段询问
    */
    function askQuestions(prompts) {
        return function (files, metalsmith, done) {
            ask(prompts, metalsmith.metadata(), done);
        };
    }
    /**
     * 中间件
     * 过滤
    */
    function filterFiles(filters) {
        return function (files, metalsmith, done) {
            filter(files, filters, metalsmith.metadata(), done);
        };
    }
    /**
     * 中间件
     * 将模板中用handbars语法写的变量渲染出来
    */
    function renderTemplateFiles() {
        return function (files, metalsmith, done) {
            var keys = Object.keys(files); // 获取files的所有key
            var metalsmithMetadata = metalsmith.metadata(); // 获取metalsmith的所有变量
            // 异步处理所有files
            async$1.each(keys, function (file, next) {
                // 获取文件的文本内容
                var str = files[file].contents.toString();
                // do not attempt to render files that do not have mustaches
                // 跳过不符合handlebars语法的file
                if (!/{{([^{}]+)}}/g.test(str)) {
                    return next();
                }
                // 渲染文件
                render(str, metalsmithMetadata, function (err, res) {
                    if (err) {
                        err.message = "[" + file + "] " + err.message;
                        return next(err);
                    }
                    files[file].contents = new Buffer(res);
                    next();
                });
            }, done);
        };
    }
    function logMessage(message, data) {
        if (!message)
            return; // 没有message直接退出函数
        render(message, data, function (err, res) {
            if (err) {
                console.error('\n模板渲染完成出错 ' + err.message.trim()); // 渲染错误打印错误信息
            }
            else {
                // 渲染成功打印最终渲染的结果
                console.log('\n' + res.split(/\r?\n/g).map(function (line) { return '   ' + line; }).join('\n'));
            }
        });
    }

    var download = require('download-git-repo'); // 用于下载远程仓库至本地 支持GitHub、GitLab、Bitbucket
    var exists$1 = require('fs').existsSync;
    var path$4 = require('path'); // node自带的path模块，用于拼接路径
    var ora = require('ora');
    var rm = require('rimraf').sync;
    var chalk$4 = require('chalk');
    // 获取用户根目录，拼接一下用来存储下载的模板，然后用构建工具生成我们想要的模板
    var home = require('user-home');
    function downloadAndGenerate(templateUrl, template, to, name) {
        // ds init webpack(template) testname(name)
        var spinner = ora('下载模板ing...');
        spinner.start(); // 显示加载状态
        if (exists$1(template))
            rm(template); // 是否存在该模板，存在就删除
        download(templateUrl, template, { clone: true }, function (err) {
            spinner.stop(); // 回调完了隐藏加载状态
            // 如果有错误，打印错误日志
            if (err)
                logger.fatal('拉取远程仓库失败 ' + template + ': ' + err.message.trim());
            // 渲染模板
            generate(name, template, to, function (err) {
                if (err)
                    logger.fatal(err);
                logger.success('生成', name);
            });
        });
    }

    var cmd = require('commander');
    var exists$2 = require('fs').existsSync;
    var inquirer$1 = require('inquirer');
    var path$5 = require('path');
    function init () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var template = args[0]; // 模板名称
        var rawName = args[1]; // 项目构建目录名
        var to = path$5.resolve(rawName || '.'); // 项目构建目录的绝对路径(当前目录)
        var inPlace = !rawName || rawName === '.'; // 没写或者“.”，表示当前目录下构建项目
        // 如果在当前目录下构建项目,当前目录名为项目构建目录名，否则是当前目录下的子目录【rawName】为项目构建目录名
        // process.cwd()是当前工作目录
        var name = inPlace ? path$5.relative('../', process.cwd()) : rawName;
        console.log(args, inPlace, args[0], args[1]);
        if (inPlace || exists$2(to)) {
            inquirer$1.prompt([{
                    type: 'confirm',
                    message: inPlace
                        ? '在当前目录生成模板'
                        : '目录已存在，是否继续？',
                    name: 'ok'
                }]).then(function (answers) {
                if (answers.ok) {
                    run();
                }
            })["catch"](logger.fatal);
        }
        else {
            run();
        }
        function run() {
            if (localPath.isLocalPath(template)) {
                // 支持本地文件模板，如ds init /usr/webpack test
                var templatePath = localPath.getTemplatePath(template);
                if (path$5.exists(templatePath)) {
                    generate(name, templatePath, to, function (err) {
                        if (err)
                            logger.fatal(err);
                        logger.success("\u751F\u6210" + name);
                    });
                }
                else {
                    logger.fatal("\u672C\u5730\u6A21\u677F" + template + "\u6CA1\u6709\u627E\u5230");
                }
            }
            else {
                checkVersion(function () {
                    // 例子ds init webpack testname
                    var gitTemplateUrl = "https://git.datatub.com:Uranus/ds-cli-" + template + "-template#master";
                    downloadAndGenerate(gitTemplateUrl, template, to, name);
                });
            }
        }
    }

    var chalk$5 = require('chalk');
    var cmd$1 = require('commander');
    var config = require('../package.json');
    var command = {
        init: init
    };
    function exec$1(type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        config.debug = args[0].debug;
        command[type].apply(command, args);
    }
    cmd$1
        .usage('<command>')
        .version(config.version)
        .description('欢迎使用开发工具');
    cmd$1
        .command('init')
        .description('初始化组件模板')
        .action(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return exec$1.apply(void 0, ['init'].concat(args));
    });
    cmd$1.command('help')
        .description('查看帮助')
        .action(function () { return cmd$1.help(); });
    // 解析输入的参数
    cmd$1.parse(process.argv);
    if (!cmd$1.args.length) {
        cmd$1.help();
    }

}));
