const path=require('path')

export default {
    isLocalPath (templatePath) {
        //判断是否是本地路径,uinx是以.或者/区分,windows是c:或者d:区分
        return /^[./]|(^[a-zA-Z]:)/.test(templatePath)
    },

    getTemplatePath (templatePath) {
        //把路径化成绝对路径
        return path.isAbsolute(templatePath)
        ? templatePath
        : path.normalize(path.join(process.cwd(), templatePath))
    }
}