const test = require( 'tape' );

const pump = require( './index' );

test( "pump()", assert => {
  assert.plan( 3 );

  const range = ( start, end ) => ( type, data ) => {
    if ( type === 0 ) {
      let current = start;

      data( 0, ( t, d ) => {
        if ( t === 1 ) {
          if ( current > end ) {
            data( 2 );
          }
          else {
            data( 1, current );
            current = current + 1;
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

  pump( range( 0, 3 ) )( 0, sink );

  assert.doesNotThrow(
    () => {
      pump( range( 0, 10000) )( 0, () => {} )
    },
    null,
    'The callbag should not throw for pullable sources with many elements'
  );
});
