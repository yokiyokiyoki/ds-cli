import typescript from "rollup-plugin-typescript2";
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'
export default {
  input: "src/main.ts",
  output: [
    {
      banner: "#!/usr/bin/env node",
      /**
       * 头部
       * 这种用法是为了防止操作系统用户没有将node装在默认的/usr/bin路径里。当系统看到这一行的时候
       * 首先会到env设置里查找node的安装路径，再调用对应路径下的解释器程序完成操作
       * */
      name: "ds",
      file: "bin/ds.js",
      format: "umd"
    }
  ],
  external: [
    "commander",
    "log-symbols",
    'rimraf',
    'ora',
    'chalk',
    'child_process',
    'assert',
    'path',
    'fs',
    'util',
    'os',
    'events',
    'axios',
    'form-data',
    'inquirer',
    'querystring',
    'download-git-repo',
    "minimatch",
    "ramda",
    "semver",
    "minimatch",
    "metalsmith",
    "handlebars"
  ],
  plugins: [
    typescript(),
    commonjs({
    include: "node_modules/**",
    extensions: ['.js', '.ts']
    }),
    uglify()
  ],
};
