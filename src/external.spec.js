import * as external from './external';
import { MISSING_OPTIONS } from './util/Errors';


const passThrough = () => ({ process: obj => obj });

describe( 'external processors', () => {
  it( 'should expose base processors', ()=> {
    expect( external.alias ).to.be.a( 'function' );
    expect( external.copy ).to.be.a( 'function' );
    expect( external.hash ).to.be.a( 'function' );
    expect( external.ref ).to.be.a( 'function' );
    expect( external.write ).to.be.a( 'function' );
  });
});

describe( 'external.plugin', () => {
  it( 'should be a function', () => {
    expect( external.plugin ).to.be.a( 'function' );
  });

  describe( '.call', ()=> {
    const construct = options => () => external.plugin( options );
    const invalidOptions = {};
    let validOptions = {
      processors: {
        'a': passThrough(),
        'b': passThrough(),
        'c': passThrough(),
        'abc': external.alias({
          processors: [ 'a', 'b', 'c' ]
        }),
        'd': external.alias({
          processors: [ 'abc', 'd' ]
        }),
        'ref': external.ref()
      }
    };

    it( 'should fail without required options', ()=> {
      expect( construct() ).to.throw( MISSING_OPTIONS );
      expect( construct({}) ).to.throw( MISSING_OPTIONS );
      expect( construct( invalidOptions ) ).to.throw( MISSING_OPTIONS );
      expect( construct( validOptions ) ).not.to.throw( Error );
    });

    describe( '[returned value]', ()=> {
      let plugin;
      before( () => {
        plugin = external.plugin( validOptions );
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
              'abc': external.alias( 'a', 'b', 'c' ),
              'd': external.alias( 'abc', 'd' ),
              'ref': external.ref()
            }
          };
          spy = {};
          Object.keys( options.processors ).forEach( key => {
            spy[ key ] = sinon.spy( options.processors[ key ], 'process' );
          });
          plugin = external.plugin( options );
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
