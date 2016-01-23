import rollup from 'rollup';
import { removeSync, readFileSync } from 'fs-extra-promise';
import { join, basename } from 'path';
import { plugin, alias } from  '../src/inline';
import less from 'less';

process.chdir( __dirname );
const output = 'test-out';

describe( 'rollup-plugin-inline', () => {
  after( () => {
    removeSync( output );
  });

  describe( 'simple integration test', () => {
    let code;
    let out = join( output, 'simple' );

    before( () => {
      const inline = plugin({
        dest: out,
        processors: {
          'asset': alias( 'copy', 'ref' )
        }
      });

      return rollup.rollup({
        entry: 'fixtures/simple.js',
        plugins: [ inline ]
      }).then( bundle => {
        code = bundle.code;
        return bundle.write({ dest: join( out, 'main.js' ) });
      });
    });

    it( 'should write files as expected', () => {
      expect( () => readFileSync( join( out, 'fixtures/assets/img.png' ) ) )
      .not.to.throw( Error );
    });

    it( 'should generate expected code', () => {
      let main = readFileSync( join( out, 'main.js' ), 'utf8' );
      expect( main ).to.contain( 'fixtures/modules/a.js' );
      expect( main ).to.contain( 'fixtures/modules/b.js' );
      expect( main ).to.contain( 'fixtures/modules/c.js' );
    });
  });

  describe( 'complex integration test', () => {
    let out = join( output, 'complex' );

    before( () => {
      const inline = plugin({
        dest: out,
        processors: {
          'asset': alias( 'copy', 'ref' )
        }
      });

      return rollup.rollup({
        entry: 'fixtures/complex.js',
        plugins: [ inline ]
      }).then( bundle => bundle.write({ dest: join( out, 'main.js' ) }) );
    });

    it( 'should write files as expected', () => {});

    it( 'should generate expected code', () => {});
  });

  describe.only( 'process integration test', () => {
    let code;
    let out = join( output, 'simple' );

    before( () => {
      const inline = plugin({
        dest: out,
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
        code = bundle.code;
        return bundle.write({ dest: join( out, 'main.js' ) });
      });
    });

    it( 'should write files as expected', () => {});

    it( 'should generate expected code', () => {});
  });
});
