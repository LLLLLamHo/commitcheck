
var exec = require( 'child_process' ).exec;
var colors = require( 'colors/safe' );

import openFile = require( './openFile' );
import getConfig = require( './getConfig' );
import getIncludeFiles = require( './getIncludeFiles' );
import checkFileContent = require( './checkFileContent' );
import getBranch = require( './getBranch' );

let pass: number = 0;
let config: any = getConfig();
let { keyword, branchs }: { keyword: number[], branchs: Array<string> } = config;
let includeFiles = getIncludeFiles( config );
let currBranch: string = getBranch();

exec( 'git diff --cached --name-only', ( error, stdout ) => {

    //没有关键字直接退出
    if ( keyword.length === 0 || branchs.length === 0 || branchs.indexOf( currBranch ) === -1 ) {
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

