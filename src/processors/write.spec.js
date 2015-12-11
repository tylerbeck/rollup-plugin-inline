import { readFileSync, removeSync } from 'fs-extra-promise';
import write from './write';
import { join } from  'path';

const output = './test-out';

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
            path: 'asset/test/out.txt',
            contents: 'Hello World!'
          };
          instance.process( test );
          expect( test.write ).to.be.a( 'function' );
        });

        describe( 'obj.write', () => {
          it( 'should write object contents to path', () => {
            let test = {
              path: 'asset/test/out.txt',
              contents: 'Hello World!'
            };
            instance.process( test );
            return test.write( output ).then( () => {
              expect( () => readFileSync( join( output, test.path ) ) ).not.to.throw( Error );
              let file = readFileSync( join( output, test.path ), 'utf8' );
              expect( file ).to.equal( test.contents );
              removeSync( output );
              return true;
            });
          });
        });
      });
    });
  });
});
