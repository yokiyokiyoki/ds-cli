// 将meta.js或者meta.json中的prompts字段解析成对应的问题询问。

const async = require('async');
const inquirer = require('inquirer');

const promptMapping = {
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

export default function ask(prompts, data, done) {
  async.eachSeries(Object.keys(prompts), (key, next) => {
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

  let promptDefault = prompt.default;
  if (typeof prompt.default === 'function') {
    promptDefault = function() {
      return prompt.default.bind(this)(data);
    };
  }

  inquirer.prompt([{
    type: promptMapping[prompt.type] || prompt.type,
    name: key,
    message: prompt.message || prompt.label || key,
    default: promptDefault,
    choices: prompt.choices || [],
    validate: prompt.validate || (() => true)
  }]).then(answers => {
    if (Array.isArray(answers[key])) {
      data[key] = {};
      answers[key].forEach(multiChoiceAnswer => {
        data[key][multiChoiceAnswer] = true;
      });
    } else if (typeof answers[key] === 'string') {
      data[key] = answers[key].replace(/"/g, '\\"');
    } else {
      data[key] = answers[key];
    }
    done();
  }).catch(done);
}
