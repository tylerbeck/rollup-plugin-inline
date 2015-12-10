import read from './read';

describe( 'read processor', () => {

  it( 'should be a function', () => {
    expect( read ).to.be.a( 'function' );
  });

  describe( '.call', () => {
    describe( '[returned value]', () => {
      let instance = read();

      describe( '.process', () => {
        it( 'should be a function', () => {
          expect( instance.process ).to.be.a( 'function' );
        });

        it( 'should set the `contents` attribute on the target ' +
            'object with the expected value', () => {
          let test = {
            'src': 'fixtures/assets/read-test.txt'
          };
          return instance.process( test ).then( () => {
            expect( test.contents ).to.contain( 'read test file contents.' );
          });
        });
      });
    });
  });
});
