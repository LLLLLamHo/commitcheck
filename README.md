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
    keywordTask: {
        keyword: ['.net', 'www'],
        exclude: ['./test/dist/*.**'],
        include: ['./test/**/*.**'],
        branchs: ['master']
    },
    eslintTask: {
        include: ['./test/**/*.**'],
        exclude: ['./test/dist/*.js'],
        branchs: ['master'],
        isNoConsole: true,
        isNoAlert: true,
        isNoDebugger: true
    }
}
```

`keywordTask` -> 关键字任务配置

| 属性    | 说明         | 类型  | 默认值 |
| ------- | ------------ | ----- | ------ |
| keyword | 搜索的关键字 | array | []     |
| exclude | 排除那些文件 | array | []     |
| include | 包含那些文件 | array | []     |
| branchs | 针对那些分支，如果为true则检查所有分支 | array/boolean | []     |

`eslintTask` -> eslint任务配置

| 属性         | 说明             | 类型    | 默认值 |
| ------------ | ---------------- | ------- | ------ |
| exclude      | 排除那些文件     | array   | []     |
| include      | 包含那些文件     | array   | []     |
| branchs      | 针对那些分支，如果为true则检查所有分支     | array/boolean   | []     |
| isNoConsole  | 是否禁止console  | boolean | false  |
| isNoAlert    | 是否禁止alert    | boolean | false  |
| isNoDebugger | 是否禁止debugger | boolean | false  |

当项目中存在eslintrc.js,则会以项目配置的eslintrc.js的配置内容为优先。

具体内置的eslintrc配置如下：

```js
const eslintrc = {
    extends: ['eslint-config-airbnb'],
    env: {
        browser: true,
        es6: true,
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,//支持es6
        ecmaFeatures: {
            jsx: true,//支持jsx
        },
    },
    plugins: [
        'react',
        'import',
        'jsx-a11y'
    ],
    rules: {
        //default
        "no-console" : 0,
        "no-alert" : 0,
        "no-debugger" : 0,
        "jsx-quotes": [2, "prefer-single"],//jsx传入数据使用单引号
         /**const object = {
            abc: () => {},
            aaaa: a,
            abv: '123',
            barBaz() {},
            qux
        };**/
        "object-shorthand": [2, "always", { "avoidQuotes": true }],
        "no-use-before-define": 0,//声明前调用
        "prefer-arrow-callback" : 0,
        "space-before-function-paren": 0,//函数空格
        "no-unneeded-ternary": 0,//关闭条件表达式
        "indent": [1, 4],//缩进4个空格
        "no-underscore-dangle": 0,//禁止使用下滑线
        "no-unused-expressions": [1, { "allowShortCircuit": true, "allowTernary": true }],// a() && b() a || b 
        "space-in-parens": [1, "always"],//括号内存在一个空间
        "comma-dangle": [2, {
            "arrays": "never",
            "objects": "never",
            "imports": "never",
            "exports": "never",
            "functions": "never"
        }],//拖尾逗号
        'class-methods-use-this': 0,//强制使用类方法
        'func-names': 0,//要求或禁止使用命名的 function 表达式
        'no-param-reassign': 0,//禁止对 function 的参数进行重新赋值
        'no-return-assign': 0, //禁止在 return 语句中使用赋值语句
        'max-len': 0,//限制一行的最大字数
        'array-callback-return': 0,//强制数组方法的回调函数中有 return 语句
        'prefer-destructuring': 0,//需要从数组或者对象中解耦
        'object-curly-newline': 0,//花括号换行
        'eol-last': 0,//要求或禁止文件末尾存在空行
        'guard-for-in': 0,
        //react
        'react/jsx-closing-tag-location' : 0,
        'react/boolean-prop-naming': 1,//强制布尔值类型一直命名 is/has
        'react/no-string-refs': 0,//强制ref = Function, ref={(c) => { this.hello = c; }}
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],//限制jsx语法在那些文件内
        "react/no-array-index-key": 0,//强制循环使用key
        'react/no-find-dom-node': 0,//防止使用findDOMNode
        'react/sort-comp': 0,//组件方法顺序
        'react/prop-types': 0,//强制使用propTypes定义参数
        'react/jsx-first-prop-new-line': 0,//组件使用属性的格式
        'react/no-multi-comp': 0,//防止每个文件定义多个组件
        'react/require-extension': 0,//扩展，文档找不到
        'react/jsx-no-comment-textnodes': 0,//防止将注释作为文本节点插入
        "react/jsx-indent": [2, 4],//react组件缩进
        "react/jsx-indent-props": [2, 4],
        "react/no-danger": 0,//禁用dangerouslySetInnerHTML
        //import
        'import/no-unresolved': 0,//确保导入文件可以解析
        'import/extensions': 0,//确保导入文件一定写扩展名
        'import/no-extraneous-dependencies': 0,//防止重复引入
        'import/prefer-default-export': 0,
        //jsx-a11y
        'jsx-a11y/img-has-alt': 0,//img是否有待alt
        'jsx-a11y/anchor-has-content': 0,//强制所有的标签都有内容
        'jsx-a11y/href-no-hash': 0,//href要带hash
        'jsx-a11y/no-static-element-interactions': 0,//强制带有事件的元素带有属性class，type等
        'jsx-a11y/click-events-have-key-events': 0,//强制可点击的元素至少有一个键盘事件
        'jsx-a11y/anchor-is-valid': 0,//强制所有锚点都是有效的
    }
}
module.exports = eslintrc;
```

