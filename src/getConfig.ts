
var fs = require( 'fs' );
var path = require( 'path' );

export = function getConfig (): object {
    
    let defaultConfing: {
        include: number[],
        exclude: number[],
        keyword: number[]
    } = require( './default.config' );

    let cwd: string = process.cwd();
    let configFilePath: string = path.join( cwd, './precommit.config.js' );

    if ( fs.existsSync( configFilePath ) ) {

        let config: any = require( configFilePath );
        
        if ( config.include && config.include.legnth > 0 ) { 
            for ( let i = 0; i < defaultConfing.include.length; i++ ) {
                if ( config.include.indexOf( defaultConfing.include[ i ] ) == -1 ) {
                    config.include.push( defaultConfing.include[ i ] );
                }
            }
            defaultConfing.include = [];
        }

        return Object.assign( {}, defaultConfing, config );
    } else {
        return defaultConfing;
    }

}
