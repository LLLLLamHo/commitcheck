const fs = require( 'fs' );
const path = require( 'path' );

module.exports = function ( fileName ) {
    const filePath = path.join( process.cwd(), fileName );
    if ( fs.existsSync( filePath ) ) {
        let fileConent = fs.readFileSync( filePath, "utf-8" );
        return fileConent;
    } else {
        console.log( `没有找到文件${filePath}`.red );
        return null;
    }
}