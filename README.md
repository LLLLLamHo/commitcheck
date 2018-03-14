# commitcheck

commitcheck是为了针对前端代码在git commit前对指定文件查找对应的关键字是否存在，从而阻止提交。

## 安装

```shell
npm install commitcheck --save-dev
```

## 运行命令

commitcheck是基于[husky](https://github.com/typicode/husky)进行开发的，所以需要配置husky的命令。然后执行`commitcheck`的命令.

package.json

```json
"scripts": {
    "precommit": "znpm run check",                      // husky的precommit命令
    "check": "node ./node_modules/.bin/commitcheck"     // commitcheck命令
}
```

## 配置文件

```js
module.exports = {
    keyword: ['.net'],
    exclude: ['./src/text/*.js'],
    include: ['./test/*.js']
}
```

| 属性    | 说明         | 类型  | 默认值 |
| ------- | ------------ | ----- | ------ |
| keyword | 搜索的关键字 | array | []     |
| exclude | 排除那些文件 | array | []     |
| include | 包含那些文件 | array | []     |


