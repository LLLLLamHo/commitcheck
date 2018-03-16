
var fs = require( 'fs' );
var path = require( 'path' );

interface keywordTaskProps {
    keywordTask: {
        keyword: number[],
        exclude: number[],
        include: number[],
        branchs: number[]
    }
}

function setKeywordTask ( defaultConfing: keywordTaskProps, config: keywordTaskProps ): object {

    let defaultConfing_keywordTask = defaultConfing.keywordTask;
    let config_keywordTask = config.keywordTask;

    if ( config_keywordTask ) { 
        for ( let key in defaultConfing_keywordTask ) { 
            config_keywordTask[key] = config_keywordTask[key].concat(defaultConfing_keywordTask[key])
        }
    
        return config_keywordTask;
    }
    
    return defaultConfing_keywordTask;
    
}



export = function getConfig (): object {

    let defaultConfing: any = require( './default.config' );
    let cwd: string = process.cwd();
    let configFilePath: string = path.join( cwd, './precommit.config.js' );

    if ( fs.existsSync( configFilePath ) ) {

        let config: any = require( configFilePath );

        //组合检测关键字的配置
        config.keywordTask = setKeywordTask( defaultConfing, config );
        return Object.assign( {}, defaultConfing, config );
    } else {
        return defaultConfing;
    }

}
