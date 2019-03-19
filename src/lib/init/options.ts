// 获取配置

const path=require('path');
// 获取json和yaml metadata返回obj
const metadata = require('read-metadata');
const exists = require('fs').existsSync;

// 检查你输入的 app-name 是否符合 npm 包名命名规范
const validateName = require('validate-npm-package-name');

import getGitUser from './git-user';

export default function options(name,dir): meta {
    const opts=getMetadata(dir);
    // 设置name字段并检测name是否合法
    setDefault(opts, 'name', name);
    setValidateName(opts);

    // 获取 name 和 email，用于生成 package.json 里面的 author 字段
    const author = getGitUser();
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
    const json = path.join(dir, 'meta.json');
    const js = path.join(dir, 'meta.js');
    let opts = {};

    if (exists(json)) {
        // 存在json的话，同步转换成obj
        opts = metadata.sync(json);
    } else if (exists(js)) {
        const req = require(path.resolve(js));
        if (req !== Object(req)) {
            throw new Error('meta.js 需要导出一个对象');
        }
        opts = req;
    }

    return opts;
}

/**
 * 向meta配置对象中添加一下默认字段
 * 设置默认字段(如name,author)
 * 主要是针对default字段
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
    const prompts = opts.prompts || (opts.prompts = {});
    if (!prompts[key] || typeof prompts[key] !== 'object') {
      prompts[key] = {
        type: 'string',
        default: val
      };
    } else {
      prompts[key].default = val;
    }
  }

/**
 * 验证npm包名
*/
function setValidateName(opts) {
    // 获取包名name
    const name = opts.prompts.name;
    const customValidate = name.validate;
    name.validate = name => {
      const its = validateName(name);
      if (!its.validForNewPackages) {
        const errors = (its.errors || []).concat(its.warnings || []);
        return 'Sorry, ' + errors.join(' and ') + '.';
      }
      if (typeof customValidate === 'function') return customValidate(name);
      return true;
    };
  }