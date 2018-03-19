const a = '.net123';
console.log( a );

function test( props ) {
    console.log( props );
}

test( '123' );

const qux = '333';
const object = {
    abc: () => {},
    aaaa: a,
    abv: '123',
    barBaz() {},
    qux
};

console.log( object );