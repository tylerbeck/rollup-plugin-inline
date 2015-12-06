import alias from './alias';
import { MISSING_OPTIONS } from '../util/Errors';

describe( 'alias processor', () => {

  it( 'should be a function', () => {
    expect( alias ).to.be.a( 'function' );
  });

  describe( '.call', () => {
    const construct = options => () => alias( options );
    const invalidOptions = {
    };
    const validOptions = {
      processors: [ 'a', 'b', 'c' ]
    };

    it( 'should fail without required options', ()=> {
      expect( construct() ).to.throw( MISSING_OPTIONS );
      expect( construct({}) ).to.throw( MISSING_OPTIONS );
      expect( construct( invalidOptions ) ).to.throw( MISSING_OPTIONS );
      expect( construct( validOptions ) ).not.to.throw( Error );
    });

    describe( '[returned value]', () => {
      let instance;
      before( () => {
       instance = alias( validOptions );
      });

      describe( '.resolve', () => {
        it( 'should be a function', () => {
          expect( instance.resolve ).to.be.a( 'function' );
        });

        it( 'should return list of aliased processors', () => {
          expect( instance.resolve() ).to.eql( validOptions.processors.reverse() );
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
