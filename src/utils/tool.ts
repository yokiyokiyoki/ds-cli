// 开一个子进程执行
import { exec } from 'child_process';
import rm from 'rimraf';
import inquirer, { Answers, Questions } from 'inquirer';
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

class Tool {
    constructor() {

    }
    /**
   * 删除文件
   * @param path
   * @return {Promise<any>}
   */
  remove(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      rm(path, err => {
        if (err) {
          reject({ type: 'remove', msg: err });
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * 执行 Shell 命令
   * @param cmd
   * @return {Promise<any>}
   */
  shell(cmd: string): Promise<any> {
    return new Promise((resolve, reject) => {
      exec(cmd, (err, stdout, stderr) => {
        if (err) {
          reject({ type: 'shell', msg: stdout + stderr });
        } else {
          resolve(stdout);
        }
      });
    });
  }

  /**
   * 通过 inquirer 询问用户
   * @param config
   * @return {Promise<any>}
   */
  ask(config: Questions): Promise<Answers> {
    return new Promise((resolve, reject) => {
      inquirer.prompt(config).then(answers => {
        resolve(answers);
      });
    });
  }

  /**
   * ajax 请求接口
   * @param options
   * @return {Promise<any>}
   */
  request(options: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
      axios(options).then((response) => {
        resolve(response);
      }).catch(err => {
        reject({ type: 'ajax请求', msg: err });
      });
    });
  }
}

export default new Tool();