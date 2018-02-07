const test = require( 'tape' );

const pump = require( './index' );

test( "pump()", assert => {
  assert.plan( 2 );

  const range = function* ( start, end ) {
    let current = start;

    while ( current <= end ) {
      yield current;
      current = current + 1;
    }
  }

  const source = ( type, data ) => {
    if ( type === 0 ) {
      const iter = range( 0, 3 );

      data( 0, ( t, d ) => {
        if ( t === 1 ) {
          const { done, value } = iter.next();


          if ( done ) {
            data( 2 );
          }
          else {
            data( 1, value );
          }
        }
      });
    }
  };

  let events = [];

  const sink = ( type, data ) => {
    if ( type === 1 ) {
      events.push( data );
    }
    if ( type === 2 ) {
      assert.equal( typeof data, 'undefined', 'The callbag should not terminate with an error.' );
      assert.deepEqual( events, [0, 1, 2, 3], 'The expected events should have been observed before termination.' );
    }
  }

  pump( source )( 0, sink );
});
