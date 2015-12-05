import rollup from 'rollup';
import external from  '../src/external';

process.chdir( __dirname );

describe( 'rollup-plugin-external', () => {
  describe( 'simple integration', () => {
    it( 'should bundle as expected', () => {
      return rollup.rollup({
        entry: 'fixtures/simple.js',
        plugins: [
          external({ processors: [] })
        ]
      }).then(function( bundle ) {
        var generated = bundle.generate();
        var code = generated.code;
        // return assets.write( './out' ).then( () => {
        console.log( 'code:\n', code );
        //   assert.equal( 'test', 'test' );
        //   return true;
        // });
      });

    });
  });
});
