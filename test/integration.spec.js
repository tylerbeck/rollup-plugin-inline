import rollup from 'rollup';
import fs from 'fs-extra-promise';
import external from  '../src/external';

process.chdir( __dirname );
const output = './test-out';

describe( 'rollup-plugin-external', () => {
  describe( 'simple integration', () => {

    after( () => {
      //fs.removeSync( output );
    });

    before( () => {
      const ext = external({ processors: [] });
      return rollup.rollup({
        entry: 'fixtures/simple.js',
        plugins: [ ext ]
      }).then(function( bundle ) {
        var generated = bundle.generate();
        var code = generated.code;
        return ext.write( output ).then( () => {
           return true;
        });
      });
    });

    it( 'should bundle as expected', () => {

    });
  });
});
