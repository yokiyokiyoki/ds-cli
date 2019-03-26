# 介绍

- 基于typescript和rollup的脚手架工具

# 专栏

- [前端如何搭建一个成熟的脚手架](https://juejin.im/post/5c98dc71e51d4501806d0a98)
- [前端如何搭建一个简单的脚手架](https://juejin.im/post/5c8f9dbfe51d45279e268e3b)


# 安装

- npm i @datastory/ds-cli -g 或者 yarn global add ds-cli
- ds init <template-name> <app-name>
- ds list

# 模板

### 要求

- 文件目录必须含有template文件夹，并且所需模板文件放在该目录下
- 文件名命名规范是ds-cli-‘name’-template，方便脚手架拉取
- 可用meta.js提高自定义程度（所谓动态化模板）


<h2 align="center">ds-cli</h2>

# 目录

- [生态](#生态)
- [快速入门](#快速入门)
  - [安装](#安装)
  - [用法](#用法)
- [感谢](#感谢)
- [License](#license)

## 生态

- doc：基于vuepress开发文档
- lib：基于typescript和rollup开发库


## 快速入门

### 安装

```bash
$ npm i @datastory/ds-cli -g               # install cli
```

目录说明:

```
├─ bin             
├─ main.ts         //入口文件
├─ src
│  ├─ lib          //详细命令入口目录
│  ├─ utils        //工具库
```

### 用法

```bash
$ ds init [template-name] <app-name>            
$ ds list
```

## 感谢

- [vue-cli](https://github.com/vuejs/vue-cli)

## License

- [MIT](https://opensource.org/licenses/MIT)
