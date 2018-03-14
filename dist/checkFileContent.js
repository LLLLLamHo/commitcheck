"use strict";
var colors = require('colors');
module.exports = function checkFileContent(filePath, fileContent, keyword) {
    let isError = false;
    for (let i = 0; i < keyword.length; i++) {
        if (fileContent.indexOf(keyword[i]) > -1) {
            console.log(colors.red(`${filePath}发现 << ${keyword[i]} >> 关键字`));
            isError = true;
            return isError;
        }
    }
    return isError;
};
