import exec from './exec';

describe( 'exec processor', () => {

  it( 'should be a function', () => {
    expect( exec ).to.be.a( 'function' );
  });

  describe( '.call', () => {
    describe( '[returned value]', () => {
      let instance = exec();

      describe( '.resolve', () => {
        it( 'should be a function', () => {
          expect( instance.resolve ).to.be.a( 'function' );
        });

        it( 'should return array with expected values', () => {
          let result = instance.resolve();
          expect( result ).to.eql([ 'rollcjs', 'exec' ]);
        });
      });

      describe( '.process', () => {
        it( 'should be a function', () => {
          expect( instance.process ).to.be.a( 'function' );
        });

        it( 'should set expected attribute on the target object', () => {
          let test = {
            code: 'exports.a="a"; exports.b="b"; exports.c="c";'
          };
          instance.process( test );
          expect( test.a ).to.equal( 'a' );
          expect( test.b ).to.equal( 'b' );
          expect( test.c ).to.equal( 'c' );
        });
      });
    });
  });
});
