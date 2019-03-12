// 开一个子进程执行
import { exec } from 'child_process';
import rm from 'rimraf';
import inquirer, { Answers, Questions } from 'inquirer';
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import chalk from 'chalk';

class tool {
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
   * 全局打印错误
   * @param msg
   */
  printError(err: Error ) {
    if (err instanceof Error) {
      console.log('\n  ' + chalk.red((err as Error).toString()) + '\n');
    }
  }
}
