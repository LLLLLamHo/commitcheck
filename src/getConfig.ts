import { isArray } from './typeof';

interface taskConfigProps {
    keyword: number[],
    exclude: number[],
    include: number[],
    branchs: number[]
}

function setTaskConfig ( defaultConfing: taskConfigProps, config: taskConfigProps ): object {
    if ( config ) {
        for ( let key in defaultConfing ) {
            if ( config[ key ] ) {
                if ( isArray( config[ key ] ) ) {
                    config[ key ] = config[ key ].concat( defaultConfing[ key ] )
                }
            } else {
                config[ key ] = defaultConfing[ key ];
            }
        }
        return config;
    }
    return defaultConfing;
}

export = function getConfig (): object {

    const fs = require( 'fs' );
    const path = require( 'path' );

    let defaultConfing: any = require( './default.config' );
    let cwd: string = process.cwd();
    let configFilePath: string = path.join( cwd, './precommit.config.js' );

    if ( fs.existsSync( configFilePath ) ) {

        let config: any = require( configFilePath );

        //组合检测关键字的配置
        config.keywordTask = setTaskConfig( defaultConfing.keywordTask, config.keywordTask );
        config.eslintTask = setTaskConfig( defaultConfing.eslintTask, config.eslintTask );

        return Object.assign( {}, defaultConfing, config );
    } else {
        return defaultConfing;
    }

}
