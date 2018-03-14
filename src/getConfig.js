const path = require( 'path' );
const fs = require( 'fs' );
let defaultConfing = require('./default.config');

module.exports = function () {

    let cwd = process.cwd();
    let configFilePath = path.join( cwd, './precommit.config.js' );
    if ( fs.existsSync( configFilePath ) ) {
        let config = require( configFilePath );

        for ( let i = 0; i < defaultConfing.include.length; i++ ) { 
            if ( config.include.indexOf( defaultConfing.include[i] ) == -1 ) { 
                config.include.push( defaultConfing.include[i] );
            }
        }

        defaultConfing.include = [];

        return Object.assign( {}, defaultConfing, config );
    } else {
        return defaultConfing;
    }

}