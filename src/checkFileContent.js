const colors = require( 'colors' );

module.exports = function ( filePath, fileContent, keyword ) {

    let isError = false;

    for ( let i = 0; i < keyword.length; i++ ) { 

        if ( fileContent.indexOf( keyword[i] ) > -1 ) { 
            console.log( `${filePath}发现 << ${keyword[i]} >> 关键字`.red );
            isError = true;
            return isError;
        }

    }
    return isError;

}