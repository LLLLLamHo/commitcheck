"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exec = require('child_process').exec;
var colors = require('colors/safe');
const openFile = require("./openFile");
const getConfig = require("./getConfig");
const getIncludeFiles = require("./getIncludeFiles");
const checkFileContent = require("./checkFileContent");
let pass = 0;
let config = getConfig();
let { keyword } = config;
let includeFiles = getIncludeFiles(config);
exec('git diff --cached --name-only', (error, stdout) => {
    if (keyword.length == 0) {
        process.exit(0);
    }
    if (stdout.length) {
        const array = stdout.split('\n');
        array.pop();
        for (let i = 0; i < array.length; i++) {
            if (includeFiles.indexOf(`./${array[i]}`) == -1) {
                continue;
            }
            let fileContent = openFile(array[i]);
            if (fileContent != '') {
                let isError = checkFileContent(array[i], fileContent, config.keyword);
                if (isError) {
                    pass = 1;
                }
                else {
                    pass = 0;
                }
            }
            else {
                pass = 1;
            }
        }
        if (pass = 0) {
            console.log(colors.green('检查通过'));
        }
        process.exit(pass);
    }
    if (error !== null) {
        console.log(colors.red(`exec error: ${error}`));
    }
});
