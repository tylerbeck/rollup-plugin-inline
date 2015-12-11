import roll from './roll';
import { plugin } from '../inline';

describe( 'roll processor', () => {

  it( 'should be a function', () => {
    expect( roll ).to.be.a( 'function' );
  });

  describe( '.call', () => {
    describe( '[returned value]', () => {
      let instance = roll({ inlineInterface: plugin() });

      describe( '.process', () => {
        it( 'should be a function', () => {
          expect( instance.process ).to.be.a( 'function' );
        });

        it( 'should set the `code` attribute on the target object with the expected value', () => {
          let test = {
            src: 'fixtures/roll-test.js'
          };
          return instance.process( test ).then( () => {
            expect( test.code ).to.contain( 'function a() {' );
          });
        });
      });
    });
  });
});
