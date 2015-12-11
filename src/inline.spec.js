import * as inline from './inline';
import { MISSING_OPTIONS } from './util/Errors';


const passThrough = () => ({ process: obj => obj });

describe( 'inline processors', () => {
  it( 'should expose base processors', ()=> {
    expect( inline.alias ).to.be.a( 'function' );
    expect( inline.copy ).to.be.a( 'function' );
    expect( inline.hash ).to.be.a( 'function' );
    expect( inline.ref ).to.be.a( 'function' );
    expect( inline.write ).to.be.a( 'function' );
  });
});

describe( 'inline.plugin', () => {
  it( 'should be a function', () => {
    expect( inline.plugin ).to.be.a( 'function' );
  });

  describe( '.call', ()=> {
    const construct = options => () => inline.plugin( options );
    let options = {
      processors: {
        'a': passThrough(),
        'b': passThrough(),
        'c': passThrough(),
        'abc': inline.alias({
          processors: [ 'a', 'b', 'c' ]
        }),
        'd': inline.alias({
          processors: [ 'abc', 'd' ]
        }),
        'ref': inline.ref()
      }
    };


    describe( '[returned value]', ()=> {
      let plugin;
      before( () => {
        plugin = inline.plugin( options );
      });

      it( 'should have the expected properties', () => {
        expect( plugin.load ).to.be.a( 'function' );
        expect( plugin.resolveId ).to.be.a( 'function' );
        expect( plugin.generate ).to.be.a( 'function' );
      });

      describe( '.resolveId', () => {
        it( 'should return null for unmatched ids', () => {
          const importee = '../path/to/asset';
          const importer = './base/module.js';
          const expected = null;
          expect( plugin.resolveId( importee, importer ) ).to.equal( expected );
        });

        it( 'should resolve asset paths', () => {
          const importee = 'a( ../path/to/asset )';
          const importer = './base/module.js';
          const expected = 'a(path/to/asset)';
          expect( plugin.resolveId( importee, importer ) ).to.equal( expected );
        });

        it( 'should resolve nested asset paths', () => {
          const importee = 'a( b( c( ../path/to/asset )))';
          const importer = './base/module.js';
          const expected = 'a(b(c(path/to/asset)))';
          expect( plugin.resolveId( importee, importer ) ).to.equal( expected );
        });
      });

      describe( '.load', () => {
        let spy, options;
        beforeEach( () => {
          options = {
            processors: {
              'a': passThrough(),
              'b': passThrough(),
              'c': passThrough(),
              'abc': inline.alias( 'a', 'b', 'c' ),
              'd': inline.alias( 'abc', 'd' ),
              'ref': inline.ref()
            }
          };
          spy = {};
          Object.keys( options.processors ).forEach( key => {
            spy[ key ] = sinon.spy( options.processors[ key ], 'process' );
          });
          plugin = inline.plugin( options );
        });

        it( 'should return null for unmatched ids', () => {
          expect( plugin.load( 'path/to/asset' ) ).to.equal( null );
        });

        it( 'should execute processors', () =>
          plugin.load( 'a(path/to/asset)' ).then( () => {
            expect( spy.a ).to.have.been.calledOnce;
          })
        );
        it( 'should execute nested processors', () =>
          plugin.load( 'a(b(path/to/asset))' ).then( () => {
            expect( spy.a ).to.have.been.calledOnce;
            expect( spy.b ).to.have.been.calledOnce;
          })
        );

        it( 'should execute resolved processors', () =>
          plugin.load( 'abc(path/to/asset)' ).then( () => {
            expect( spy.a ).to.have.been.calledOnce;
            expect( spy.b ).to.have.been.calledOnce;
            expect( spy.c ).to.have.been.calledOnce;
          })
        );

        it( 'should execute recursively resolved processors', () =>
          plugin.load( 'd(path/to/asset)' ).then( () => {
            expect( spy.a ).to.have.been.calledOnce;
            expect( spy.b ).to.have.been.calledOnce;
            expect( spy.c ).to.have.been.calledOnce;
            expect( spy.d ).to.have.been.calledOnce;
          })
        );

        it( 'should execute ref processor if code not set', () =>
          plugin.load( 'a(path/to/asset)' ).then( () => {
            expect( spy.a ).to.have.been.calledOnce;
            expect( spy.ref ).to.have.been.calledOnce;
          })
        );
      });

      describe( '.generate', () => {

      });
    });
  });
});
