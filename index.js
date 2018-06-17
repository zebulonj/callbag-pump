const pump = inputSource => {
  return outputSource = ( start, outputSink ) => {
    if ( start === 0 ) {
      let talkback;
      let pulling;
      let pushReceived;

      const pullWhilePushReceived = () => {
        pulling = true;
        do {
          pushReceived = false;
          talkback( 1 );
        } while (pulling && pushReceived);
        pulling = false;
      }

      inputSource( 0, ( type, data ) => {
        if ( type === 0 ) {
          talkback = data;

          outputSink( 0, ( t, d ) => {
            if ( t === 2 ) {
              pulling = false;          // exit pull loop
              talkback( 2 );
            }
          });

          pullWhilePushReceived();
        }
        else {
          outputSink( type, data );

          if ( type === 1 ) {
            if ( pulling ) {
              pushReceived = true;      // continue pull loop
            }
            else {
              pullWhilePushReceived();  // start pull loop
            }
          }
        }
      })
    }
  };
}

module.exports = pump;
