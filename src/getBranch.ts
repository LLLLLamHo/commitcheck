var fs = require( 'fs' );
var path = require( 'path' );

export = function getBranch(): string {
    let branch = '';
    const cwd = process.cwd();
    if ( fs.existsSync( path.join( cwd, './.git/HEAD' ) ) ) {
        let file = fs.readFileSync( path.join( cwd, './.git/HEAD' ), 'utf8' );
        let arr = file.split( '/' );
        branch = arr[arr.length - 1].replace( /\s+/g, '' ).split( '\\' )[0];
    }

    return branch;
}