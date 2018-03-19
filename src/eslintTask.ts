
import getIncludeFiles = require( './getIncludeFiles' );
import { isArray } from './typeof';

namespace eslintTask {
    export interface PropsData {
        branchs: Array<string>,
        include: Array<string>,
        exclude: Array<string>,
        isNoConsole: boolean,
        isNoAlert: boolean,
        isNoDebugger: boolean
    }
}

function extendEslintConfig ( eslintConfig: any, isNoConsole: boolean, isNoAlert: boolean, isNoDebugger: boolean ): object {
    if ( isNoConsole ) {
        eslintConfig.rules[ 'no-console' ] = 2;
    }
    if ( isNoAlert ) {
        eslintConfig.rules[ 'no-alert' ] = 2;
    }
    if ( isNoDebugger ) {
        eslintConfig.rules[ 'no-debugger' ] = 2;
    }
    return eslintConfig;
}

function getRunEslintFiles ( commitFile: Array<string>, includeFiles: Array<string> ): Array<string> {
    const path = require( 'path' );
    let runEslintFiles: Array<string> = [];
    let len: number = commitFile.length;
    for ( let i = 0; i < len; i++ ) {
        if ( includeFiles.indexOf( `./${ commitFile[ i ] }` ) !== -1 ) {
            //just check js jsx
            let ext = path.parse( commitFile[ i ] ).ext;
            if ( ext == '.js' || ext == '.jsx' ) {
                runEslintFiles.push( commitFile[ i ] );
            }
        }
    }
    return runEslintFiles;
}

function getErrorLevel ( number: number ): string {
    switch ( number ) {
        case 2:
            return 'error'
        case 1:
            return 'warn'
        default:
    }
    return 'undefined'
}

function eslintTask ( config: eslintTask.PropsData, commitFiles: Array<string>, currBranch: string, currPass: number ): number {
    const colors = require( 'colors' );
    const { include, exclude, branchs, isNoConsole, isNoAlert, isNoDebugger } = config;

    let eslintConfig: any = require( './eslintrc.config.js' );
    eslintConfig = extendEslintConfig( eslintConfig, isNoConsole, isNoAlert, isNoDebugger );
    const CLIEngine = require( 'eslint' ).CLIEngine;
    const cli = new CLIEngine( eslintConfig );

    let pass: number = 0;

    if ( include.length === 0 ) { 
        return currPass === 0 ? pass : currPass;
    }
    if ( isArray( branchs ) ) {
        if ( branchs.length === 0 || branchs.indexOf( currBranch ) === -1 ) {
            return currPass === 0 ? pass : currPass;
        }
    } else { 
        if ( !branchs ) { 
            return currPass === 0 ? pass : currPass;
        }
    }

    let taskFiles: Array<string> = getIncludeFiles( include, exclude );
    let runEslintFiles: Array<string> = getRunEslintFiles( commitFiles, taskFiles );

    const report = cli.executeOnFiles( runEslintFiles );
    const errorReport = CLIEngine.getErrorResults( report.results );

    let errorCount: number = 0;
    let warningCount: number = 0;

    errorReport.forEach( ( result ) => {
        errorCount += result.errorCount;
        warningCount += result.warningCount;
        if ( result.messages.length > 0 ) {
            console.log( '\n' )
            console.log( colors.red( result.filePath ) )
            result.messages.forEach( ( obj ) => {
                const level: string = getErrorLevel( obj.severity );
                console.log( colors.red( `   ${ obj.line }:${ obj.column }  ${ level }  ${ obj.message }  ${ obj.ruleId }` ) )
                pass = 1;
            } )
        }
    } );

    if ( pass === 0 && errorCount === 0 ) {
        console.log( colors.green( 'eslint检查通过！' ) );
    } else {
        console.log( colors.red( '关键字检查不通过！' ) );
        console.log( colors.red( `共发现${ errorCount }个错误` ) );
        console.log( colors.yellow( `共发现${ warningCount }个警告` ) );
    }

    return currPass === 0 ? pass : currPass;
}

export = eslintTask;