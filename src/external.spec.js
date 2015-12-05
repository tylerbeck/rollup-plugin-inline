import external from './external';

const passThrough = () => ({ process: obj => obj });

describe( 'external', () => {
  it( 'should be a function', () => {
    expect( external ).to.be.a( 'function' );
  });

  it( 'should expose base processors', ()=> {
    expect( external.ref ).to.be.a( 'function' );
    expect( external.alias ).to.be.a( 'function' );
  });

  describe( '.call', ()=> {
    const construct = options => () => external( options );
    const expectedOptionsError = 'MISSING_OPTIONS';
    const invalidOptions = {
    };
    const validOptions = {
      processors: {
        'test': passThrough()
      }
    };

    it( 'should fail without required options', ()=> {
      expect( construct() ).to.throw( expectedOptionsError );
      expect( construct({}) ).to.throw( expectedOptionsError );
      expect( construct( invalidOptions ) ).to.throw( expectedOptionsError );
      expect( construct( validOptions ) ).not.to.throw( Error );
    });

    describe( '[returned value]', ()=> {
      let plugin = external( validOptions );

      it( 'should be a valid rollup plugin', () => {
        expect( plugin.load ).to.be.a( 'function' );
        expect( plugin.resolveId ).to.be.a( 'function' );
      });

      describe( '.load', () => {

      });

      describe( '.resolveId', () => {

      });
    });
  });
});
