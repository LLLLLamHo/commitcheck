module.exports = {
    keywordTask: {
        keyword: ['.net', 'www'],
        exclude: ['./test/dist/*.**'],
        include: ['./test/**/*.**'],
        branchs: ['master']
    },
    eslintTask: {
        include: ['./test/**/*.**'],
        exclude: ['./test/dist/*.js', './test/dist/*.css'],
        branchs: ['master'],
        isNoConsole: true,
        isNoAlert: true,
        isNoDebugger: true
    }
};