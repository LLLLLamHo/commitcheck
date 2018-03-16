
import getKeywordTaskIncludeFiles = require( './getKeywordTaskIncludeFiles' );
import openFile = require( './openFile' );
import checkFileContent = require( './checkFileContent' );

namespace keywordTaskProps {

    export interface PropsData {
        keyword: Array<string>,
        branchs: Array<string>,
        include: Array<string>,
        exclude: Array<string>
    }

}

export = function keywordTask ( config: any, commitFiles: Array<string>, currBranch: string ): number {

    let pass = 0;
    let { keyword, branchs, include, exclude }: { keyword: Array<string>, branchs: Array<string>, include: Array<string>, exclude: Array<string> } = config;
    let includeFiles = getKeywordTaskIncludeFiles( include, exclude );

    //没有关键字直接退出或者不是指定分支
    if ( keyword.length === 0 || branchs.length === 0 || branchs.indexOf( currBranch ) === -1 ) {
        process.exit( pass );
    }

    for ( let i = 0; i < commitFiles.length; i++ ) {
        if ( includeFiles.indexOf( `./${ commitFiles[ i ] }` ) === -1 ) {
            continue;
        }
        let fileContent: string = openFile( commitFiles[ i ] );
        if ( fileContent !== '' ) {
            let isError = checkFileContent( commitFiles[ i ], fileContent, include );
            if ( isError ) {
                pass = 1;
            }
        }
    }
    console.log( pass );
    return pass;
}

