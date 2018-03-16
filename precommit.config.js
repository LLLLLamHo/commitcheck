module.exports = {
    keywordTask: {
        keyword: ['.net'],
        exclude: ['./src/text/*.js'],
        include: ['./test/*.js'],
        branchs: ['master']
    },
    eslintTask: {
        include: ['./src/text/*.js'],
        exclude: ['./test/*.js'],
        branchs: ['master']
    }
}