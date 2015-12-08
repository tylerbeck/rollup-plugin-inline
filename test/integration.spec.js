import rollup from 'rollup';
import { removeSync, readFileSync } from 'fs-extra-promise';
import { join } from 'path';
import { plugin, alias, } from  '../src/external';

process.chdir( __dirname );
const output = './test-out';

describe( 'rollup-plugin-external', () => {
  describe( 'simple integration', () => {
    let code;
    after( () => {
      removeSync( output );
    });
    before( () => {
      const external = plugin({
        processors: {
          'asset': alias( 'copy', 'ref' )
        }
      });
      return rollup.rollup({
        entry: 'fixtures/simple.js',
        plugins: [ external ]
      }).then( bundle => {
        var generated = bundle.generate();
        code = generated.code;
        return external.generate( output ).then( () => true );
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
});
