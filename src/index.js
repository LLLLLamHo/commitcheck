
const exec = require( 'child_process' ).exec;
const openFile = require( './openFile' );
const colors = require( 'colors' );
const getConfig = require( './getConfig' );
const getIncludeFiles = require( './getIncludeFiles' );
const checkFileContent = require( './checkFileContent' );

let pass = 0;
let config = getConfig();
let { keyword } = config;
let includeFiles = getIncludeFiles( config );

exec( 'git diff --cached --name-only', ( error, stdout ) => {
    
    if ( keyword.length == 0 ) { 
        process.exit( 0 );
    }

    if ( stdout.length ) {
        const array = stdout.split( '\n' )
        array.pop()
        for ( let i = 0; i < array.length; i++ ) {
            if ( includeFiles.indexOf( `./${array[i]}` ) == -1 ) {
                continue;
            }
            let fileContent = openFile( array[i] );
            if ( fileContent ) {
                let isError = checkFileContent( array[i], fileContent, config.keyword );
                if ( isError ) {
                    pass = 1;
                } else {
                    pass = 0;
                }
            } else {
                pass = 1;
            }
        }

        if ( pass = 0 ) {
            console.log( '检查通过'.green );
        }

        process.exit( 1 );
    }
    if ( error !== null ) {
        console.log( `exec error: ${error}` )
    }
} )

