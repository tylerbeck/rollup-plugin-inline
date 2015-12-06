import alias from './alias';
import { MISSING_OPTIONS } from './Errors';

describe( 'alias processor', () => {

  it( 'should be a function', () => {
    expect( alias ).to.be.a( 'function' );
  });

  describe( '.call', () => {
    const construct = options => () => ref( options );
    const invalidOptions = {
    };
    const validOptions = {
      processors: [ 'a', 'b', 'c' ]
    };

    it( 'should fail without required options', ()=> {
      expect( construct() ).to.throw( expectedOptionsError );
      expect( construct({}) ).to.throw( expectedOptionsError );
      expect( construct( invalidOptions ) ).to.throw( MISSING_OPTIONS );
      expect( construct( validOptions ) ).not.to.throw( Error );
    });



    describe( '[returned value]', () => {
      let instance = alias();

      describe( '.resolve', () => {
        it( 'should be a function', () => {
          expect( instance.resolve ).to.be.a( 'function' );
        });

      });

      describe( '.process', () => {
        it( 'should be a function', () => {
          expect( instance.process ).to.be.a( 'function' );
        });

        it( 'should pass through object', () => {
          let test = {
            'one': 1,
            'two': 2,
            'three': 3
          };
          let expected = {
            'one': 1,
            'two': 2,
            'three': 3
          };
          instance.process( test );
          expect( test ).to.eql( expected );
        });
      });
    });
  });
});
