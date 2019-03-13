/**
 * 新开一个shell获取git邮箱，名字
 * 返回 姓名<邮箱>
*/
const exec = require('child_process').execSync;
export default() => {
    let name='';
    let email='';

    try {
        name = exec('git config --get user.name');
        email = exec('git config --get user.email');
    } catch (e) {
        console.log(e);
    }

    name = name && JSON.stringify(name.toString().trim()).slice(1, -1);
    email = email && (' <' + email.toString().trim() + '>');
    return (name || '') + (email || '');
};