
import getIncludeFiles = require( './getIncludeFiles' );
import openFile = require( './openFile' );
import checkFileContent = require( './checkFileContent' );
import { isArray } from './typeof';
namespace keywordTask {
    export interface PropsData {
        keyword: Array<string>,
        branchs: Array<string>,
        include: Array<string>,
        exclude: Array<string>
    }
}

function keywordTask ( config: keywordTask.PropsData, commitFiles: Array<string>, currBranch: string ): number {
    const colors = require( 'colors' );
    let pass: number = 0;
    let errorCount: number = 0;
    let { keyword, branchs, include, exclude } = config;
    let includeFiles: Array<string> = getIncludeFiles( include, exclude );
    //没有关键字直接退出或者不是指定分支
    
    if ( keyword.length === 0 ) { 
        return pass;
    }

    if ( isArray( branchs ) ) {
        if ( branchs.length === 0 || branchs.indexOf( currBranch ) === -1 ) {
            return pass;
        }
    } else { 
        if ( !branchs ) { 
            return pass;
        }
    }

    for ( let i = 0; i < commitFiles.length; i++ ) {
        if ( includeFiles.indexOf( `./${ commitFiles[ i ] }` ) === -1 ) {
            continue;
        }
        let fileContent: string = openFile( commitFiles[ i ] );
        if ( fileContent !== '' ) {
            let isError = checkFileContent( commitFiles[ i ], fileContent, keyword );
            if ( isError ) {
                errorCount++;
                pass = 1;
            }
        }
    }

    if ( pass === 0 && errorCount === 0 ) {
        console.log( colors.green( '关键字检查通过！' ) );
    } else {
        console.log( colors.red( '关键字检查不通过！' ) );
        console.log( colors.red( `共发现${ errorCount }个错误` ) );
    }

    return pass;
}

export = keywordTask;

