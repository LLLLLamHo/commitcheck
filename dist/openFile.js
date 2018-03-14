"use strict";
var fs = require('fs');
var path = require('path');
var colors = require('colors');
module.exports = function openFile(fileName) {
    const filePath = path.join(process.cwd(), fileName);
    if (fs.existsSync(filePath)) {
        let fileConent = fs.readFileSync(filePath, "utf-8");
        return fileConent;
    }
    else {
        console.log(colors.red(`没有找到文件${filePath}`));
        return '';
    }
};
