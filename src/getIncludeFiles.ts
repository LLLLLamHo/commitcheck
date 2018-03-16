

var glob = require( "glob" );

namespace getIncludefiles { 
    export interface ConfigData {
        include: number[],
        exclude: number[]
    }
}

function getIncludefiles ( config: getIncludefiles.ConfigData ): any {

    let { include, exclude }: { include: number[], exclude: number[] } = config;
    let includeCheckFiles: number[] = [];
    let excludeCheckFiles: number[] = [];

    // 包含文件
    if ( include && include.length != 0 ) {
        for ( let i = 0; i < include.length; i++ ) {
            let files: number[] = glob.sync( include[ i ], { cwd: process.cwd() } );
            includeCheckFiles = includeCheckFiles.concat( files );
        }
    }
    //排除文件
    if ( exclude && exclude.length != 0 ) {
        for ( let i = 0; i < exclude.length; i++ ) {
            let files: number[] = glob.sync( exclude[ i ], { cwd: process.cwd() } );
            excludeCheckFiles = excludeCheckFiles.concat( files );
        }
    }
    //最终需要检测的文件
    if ( excludeCheckFiles && excludeCheckFiles.length > 0 ) {
        for ( let i = 0; i < excludeCheckFiles.length; i++ ) {
            let index: number = includeCheckFiles.indexOf( excludeCheckFiles[ i ] );
            if ( index != -1 ) {
                includeCheckFiles.splice( index, 1 );
            }
        }
    }

    return includeCheckFiles;
}


export = getIncludefiles;