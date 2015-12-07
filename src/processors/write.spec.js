import write from './write';

describe( 'write processor', () => {

  it( 'should be a function', () => {
    expect( write ).to.be.a( 'function' );
  });

  describe( '.call', () => {
    describe( '[returned value]', () => {
      let instance = write();

      describe( '.process', () => {
        it( 'should be a function', () => {
          expect( instance.process ).to.be.a( 'function' );
        });

        it( 'should set the `write` attribute on the target object', () => {
          let test = {
            path: 'asset/test/out.png',
            src: '../../test/fixtures/assets/img.png'
          };
          instance.process( test );
          expect( test.write ).to.be.a( 'function' );
        });
      });
    });
  });
});
