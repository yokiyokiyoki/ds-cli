#!/usr/bin/env node
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('child_process'), require('rimraf'), require('inquirer'), require('axios')) :
  typeof define === 'function' && define.amd ? define(['child_process', 'rimraf', 'inquirer', 'axios'], factory) :
  (global = global || self, factory(global.child_process, global.rm, global.inquirer$1, global.axios));
}(this, function (child_process, rm, inquirer$1, axios) { 'use strict';

  rm = rm && rm.hasOwnProperty('default') ? rm['default'] : rm;
  inquirer$1 = inquirer$1 && inquirer$1.hasOwnProperty('default') ? inquirer$1['default'] : inquirer$1;
  axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;

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
              rm(path, function (err) {
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
              inquirer$1.prompt(config).then(function (answers) {
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
  var path = require('path');
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
                  console.log(res, res.data);
                  // 执行回调
                  done();
                  return [2 /*return*/];
          }
      });
  }); });

  var cmd = require('commander');
  var exists = require('fs').existsSync;
  var inquirer = require('inquirer');
  var path$1 = require('path');
  function init () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      var rawName = args[1]; // 项目构建目录名
      var to = path$1.resolve(rawName || '.'); // 项目构建目录的绝对路径
      var inPlace = !rawName || rawName === '.'; // 没写或者“.”，表示当前目录下构建项目
      // 如果在当前目录下构建项目,当前目录名为项目构建目录名，否则是当前目录下的子目录【rawName】为项目构建目录名
      var name = inPlace ? path$1.relative('../', process.cwd()) : rawName;
      console.log(args, inPlace, args[0], args[1]);
      if (inPlace || exists(to)) {
          inquirer.prompt([{
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
  }
  function run() {
      checkVersion(function () { });
  }

  var chalk$2 = require('chalk');
  var cmd$1 = require('commander');
  var config = require('../package.json');
  var command = {
      init: init
  };
  function exec(type) {
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
      return exec.apply(void 0, ['init'].concat(args));
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
