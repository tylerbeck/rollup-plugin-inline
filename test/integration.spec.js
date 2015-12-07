import rollup from 'rollup';
import fs from 'fs-extra-promise';
import { plugin, alias, } from  '../src/external';

process.chdir( __dirname );
const output = './test-out';

describe( 'rollup-plugin-external', () => {
  describe( 'simple integration', () => {

    after( () => {
      fs.removeSync( output );
    });

    before( () => {
      const external = plugin({
        processors: {
          'asset': alias( 'write', 'ref' )
        }
      });
      return rollup.rollup({
        entry: 'fixtures/simple.js',
        plugins: [ external ]
      }).then( bundle => {
        var generated = bundle.generate();
        var code = generated.code;
        return external.write( output ).then( () => true );
      });
    });

    it( 'should bundle as expected', () => {

    });
  });
});
