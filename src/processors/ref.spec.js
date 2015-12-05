import ref from './ref';

describe( 'ref processor', () => {

  it( 'should be a function', () => {
    expect( ref ).to.be.a( 'function' );
  });

  describe( '.call', () => {
    describe( '[returned value]', () => {
      let instance = ref();

      describe( '.process', () => {
        it( 'should be a function', () => {
          expect( instance.process ).to.be.a( 'function' );
        });

        it( 'should set the `code` attribute on the target object with the expected value', () => {
          let test = {
            'one': 1,
            'two': 2,
            'three': 3
          };
          const exports = [
            'export default {"one":1,"two":2,"three":3};',
            'export const one = 1;',
            'export const two = 2;',
            'export const three = 3;'
          ];
          instance.process( test );
          expect( test.code ).to.equal( exports.join( '\n' ) );
        });
      });
    });
  });
});
