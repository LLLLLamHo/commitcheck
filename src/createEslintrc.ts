'use strict';

const fs = require( 'fs' );
const path = require( 'path' );
const cwd = process.cwd();

const configPath: Array<string> = [
    '.eslintrc.js',
    '.eslintrc.yaml',
    '.eslintrc.yml',
    '.eslintrc.json',
    '.eslintrc',
];

let eslintConfigPath: string = './eslintrc.config.js';
let hasCreate: boolean = true;
for ( let i: number = 0; i < configPath.length; i++ ) {
    let currPath = path.join( cwd, configPath[ i ] );
    if ( fs.existsSync( currPath ) ) {
        hasCreate = false;
    }
}
if ( hasCreate ) {
    return false;
    fs.copyFileSync( path.join( __dirname, './eslintrc.config.js' ), path.join( cwd, './.eslintrc.js' ) );
}
