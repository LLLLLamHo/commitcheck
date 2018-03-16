var fs = require( 'fs' );
var path = require( 'path' );

export = function getBranch(): string {
    let branch = '';
    
    if ( fs.existsSync( path.join( __dirname, '../.git/HEAD' ) ) ) {
        let file = fs.readFileSync( path.join( __dirname, '../.git/HEAD' ), 'utf8' );
        let arr = file.split( '/' );
        branch = arr[arr.length - 1].replace( /\s+/g, '' ).split( '\\' )[0];
    }

    return branch;
}