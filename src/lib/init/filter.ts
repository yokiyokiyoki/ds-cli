/**
 * 根据metalsmith.metadata()删除一些不需要的模板文件，而metalsmith.metadata()主要在ask.ts中改变的
 * 也就是说ask.ts中获取到用户的需求。
*/

// 字符匹配工具
const match = require('minimatch');
// 返回某作用下表达式的值
const evaluate = require('./eval');
/**
 * files 模板内的所有文件
 * filters meta.js或者meta.json的filters字段
 * data metalsmith.metadata()
 * done  交于下一个metalsmith插件处理
 */
export default (files, filters, data, done) => {
  if (!filters) {
    // meta.js或者meta.json没有filters字段直接跳过交于下一个metalsmith插件处理
    return done();
  }
  // 获取所有文件的名字
  const fileNames = Object.keys(files);
  // 遍历meta.js或者meta.json没有filters下的所有字段
  Object.keys(filters).forEach(glob => {
    // 遍历所有文件名
    fileNames.forEach(file => {
      // 如果有文件名跟filters下的某一个字段匹配上
      if (match(file, glob, { dot: true })) {
        const condition = filters[glob];
        if (!evaluate(condition, data)) {
          // 如果metalsmith.metadata()下condition表达式不成立，删除该文件
          delete files[file];
        }
      }
    });
  });
  done();
};