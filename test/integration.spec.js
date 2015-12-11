import rollup from 'rollup';
import { removeSync, readFileSync } from 'fs-extra-promise';
import { join, basename } from 'path';
import { plugin, alias } from  '../src/inline';
import less from 'less';

process.chdir( __dirname );
const output = './test-out';

describe( 'rollup-plugin-inline', () => {
  describe( 'simple integration test', () => {
    let code;
    after( () => {
      //removeSync( output );
    });
    before( () => {

      const inline = plugin({
        processors: {
          'asset': alias( 'copy', 'ref' )
        }
      });

      return rollup.rollup({
        entry: 'fixtures/simple.js',
        plugins: [ inline ]
      }).then( bundle => {
        var generated = bundle.generate();
        code = generated.code;
        return inline.generate( output ).then( () => true );
      });

    });

    it( 'should write files as expected', () => {
      expect( () => readFileSync( join( output, 'fixtures/assets/img.png' ) ) )
      .not.to.throw( Error );
    });

    it( 'should generate expected code', () => {
      expect( code ).to.contain( 'fixtures/modules/a.js' );
      expect( code ).to.contain( 'fixtures/modules/b.js' );
      expect( code ).to.contain( 'fixtures/modules/c.js' );
    });

  });

  describe.skip( 'complex integration test', () => {

    let code;

    after( () => {
      removeSync( output );
    });

    before( () => {

      const inline = plugin({
        processors: {
          'asset': alias( 'copy', 'ref' )
        }
      });

      return rollup.rollup({
        entry: 'fixtures/complex.js',
        plugins: [ inline ]
      }).then( bundle => {
        var generated = bundle.generate();
        code = generated.code;
        console.log( code );
        return inline.generate( output ).then( () => true );
      });
    });

    it( 'should write files as expected', () => {
    });

    it( 'should generate expected code', () => {
    });

  });

  describe.skip( 'process integration test', () => {

    let code;

    after( () => {
      //removeSync( output );
    });

    before( () => {

      const inline = plugin({
        processors: {
          'less': {
            resolve: () => [ 'read', 'less', 'write', 'ref' ],
            process: obj => less.render( obj.contents )
                  .then( output => {
                    obj.path = 'css/styles.css';
                    obj.contents = output.css;
                    return obj;
                  })
          }
        }
      });

      return rollup.rollup({
        entry: 'fixtures/process.js',
        plugins: [ inline ]
      }).then( bundle => {
        var generated = bundle.generate();
        code = generated.code;
        console.log( code );
        return inline.generate( output ).then( () => true );
      });
    });

    it( 'should write files as expected', () => {
    });

    it( 'should generate expected code', () => {
    });

  });

});
