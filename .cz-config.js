"use strict";
module.exports = {
  types: [
    {
      value: "wip",
      name: "wip：大版本功能开发阶段性提交"
    },
    { value: "feat", name: "feat：完整新功能提交" },
    { value: "fix", name: "fix：修复bug" },
    {
      value: "build",
      name: "build：打包，准备发布"
    },
    { value: "docs", name: "docs：只修改了文档相关的文件，例如修改README.md" },
    {
      value: "style",
      name:
        "style：代码风格、不影响代码功能的更改，例如修改空格缩进，换行规范等n"
    },
    {
      value: "refactor",
      name: "refactor：既不修复错误也不添加新功能的代码更改，例如重构"
    },
    {
      value: "chore",
      name:
        "chore：对非业务性代码进行修改，例如包管理器,构建过程或辅助工具的变动"
    }
  ],
  scopes: [],
  scopeOverrides: {
    fix: [{ name: "merge" }],
    chore: []
  },
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"]
};
