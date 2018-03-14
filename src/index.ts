
var exec = require( 'child_process' ).exec;
var colors = require( 'colors/safe' );

import openFile = require( './openFile' );
import getConfig = require( './getConfig' );
import getIncludeFiles = require( './getIncludeFiles' );
import checkFileContent = require( './checkFileContent' );

let pass: number = 0;
let config: any = getConfig();
let { keyword }: { keyword: number[] } = config;
let includeFiles = getIncludeFiles( config );

exec( 'git diff --cached --name-only', ( error, stdout ) => {

    if ( keyword.length === 0 ) {
        process.exit( 0 );
    }

    if ( stdout.length ) {
        const array: Array<string> = stdout.split( '\n' )
        array.pop()
        for ( let i = 0; i < array.length; i++ ) {
            if ( includeFiles.indexOf( `./${ array[ i ] }` ) === -1 ) {
                continue;
            }
            let fileContent: string = openFile( array[ i ] );
            if ( fileContent !== '' ) {
                let isError = checkFileContent( array[ i ], fileContent, config.keyword );
                if ( isError ) {
                    pass = 1;
                }
            }
        }

        if ( pass === 0 ) {
            console.log( colors.green( '检查通过' ) );
        }
        
        process.exit( pass );
    }
    if ( error !== null ) {
        console.log( colors.red( `exec error: ${ error }` ) );
    }
} )

