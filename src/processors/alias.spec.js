import alias from './alias';
import { MISSING_OPTIONS } from '../util/Errors';

describe( 'alias processor', () => {

  it( 'should be a function', () => {
    expect( alias ).to.be.a( 'function' );
  });

  describe( '.call', () => {
    const construct = params => () => alias( ...params );
    const validParams = [ 'a', 'b', 'c' ];

    describe( '[returned value]', () => {
      let instance;
      before( () => {
       instance = alias( ...validParams );
      });

      describe( '.resolve', () => {
        it( 'should be a function', () => {
          expect( instance.resolve ).to.be.a( 'function' );
        });

        it( 'should return list of aliased processors', () => {
          expect( instance.resolve() ).to.eql( validParams.reverse() );
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
