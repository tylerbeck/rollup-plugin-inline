import { readFileSync, removeSync } from 'fs-extra-promise';
import copy from './copy';
import { join } from  'path';

const output = './test-out';

describe( 'copy processor', () => {

  it( 'should be a function', () => {
    expect( copy ).to.be.a( 'function' );
  });

  describe( '.call', () => {
    describe( '[returned value]', () => {
      let instance = copy();

      describe( '.process', () => {
        it( 'should be a function', () => {
          expect( instance.process ).to.be.a( 'function' );
        });

        it( 'should set the `generate` attribute on the target object', () => {
          let test = {
            path: 'asset/test/out.png',
            src: './fixtures/assets/img.png'
          };
          instance.process( test );
          expect( test.generate ).to.be.a( 'function' );
        });

        it( 'should copy file from src to path', () => {
          let test = {
            path: 'asset/test/out.png',
            src: './fixtures/assets/img.png'
          };
          instance.process( test );
          return test.generate( output ).then( () => {
            expect( () => readFileSync( join( output, test.path ) ) ).not.to.throw( Error );
            removeSync( output );
            return true;
          });
        });
      });
    });
  });
});
