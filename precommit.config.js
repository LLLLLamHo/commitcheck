module.exports = {
    keywordTask: {
        keyword: ['.net', 'www'],
        exclude: ['./test/dist/*.**'],
        include: ['./test/**/*.**'],
        branchs: false
    },
    eslintTask: {
        include: ['./test/**/*.**'],
        exclude: ['./test/dist/*.js', './test/dist/*.css'],
        branchs: false
    }
};