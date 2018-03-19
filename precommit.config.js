module.exports = {
    keywordTask: {
        keyword: ['.net', 'www'],
        exclude: ['./test/dist/*.**'],
        include: ['./test/**/*.**'],
        branchs: true
    },
    eslintTask: {
        include: ['./test/**/*.**'],
        exclude: ['./test/dist/*.js', './test/dist/*.css'],
        branchs: [''],
        isNoConsole: true,
        isNoAlert: true,
        isNoDebugger: true
    }
};