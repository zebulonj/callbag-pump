const pump = inputSource => {
  return ( start, outputSink ) => {
    if ( start === 0 ) {
      let talkback;

      inputSource( 0, ( type, data ) => {
        if ( type === 0 ) {
          talkback = data;

          outputSink( 0, ( t, d ) => {
            if ( t === 2 ) {
              talkback( 2 );
            }
          });

          talkback( 1 );
        }
        else {
          outputSink( type, data );

          if ( type === 1 ) {
            talkback( 1 );
          }
        }
      })
    }
  };
}

module.exports = pump;
