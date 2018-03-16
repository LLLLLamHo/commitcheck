
var exec = require( 'child_process' ).exec;
var colors = require( 'colors/safe' );

import getConfig = require( './getConfig' );
import getBranch = require( './getBranch' );
import keywordTask = require( './keywordTask' );

let pass: number = 0;
let config: any = getConfig();
let currBranch: string = getBranch();

exec( 'git diff --cached --name-only', ( error, stdout ) => {

    if ( stdout.length ) {
        const array: Array<string> = stdout.split( '\n' )
        array.pop();

        //执行检查关键字
        pass = keywordTask( config.keywordTask, array, currBranch );

        if ( pass === 0 ) {
            console.log( colors.green( '检查通过' ) );
        }

        process.exit( pass );
    }
    if ( error !== null ) {
        console.log( colors.red( `exec error: ${ error }` ) );
    }
} )

