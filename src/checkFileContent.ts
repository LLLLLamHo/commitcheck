
var colors = require( 'colors' );

export = function checkFileContent ( filePath: string, fileContent: string, keyword: Array<string> ): boolean {
    let isError: boolean = false;
    for ( let i = 0; i < keyword.length; i++ ) {
        if ( fileContent.indexOf( keyword[ i ] ) > -1 ) {
            console.log( colors.red( `${ filePath }发现 << ${ keyword[ i ] } >> 关键字` ) );
            isError = true;
            return isError;
        }
    }
    return isError;

}