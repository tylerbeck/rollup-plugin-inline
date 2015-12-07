import hash from './hash';

describe( 'hash processor', () => {
  let clock;
  before( () => {
    clock = sinon.useFakeTimers();
  });

  after( () => {
    clock.restore();
  });

  it( 'should be a function', () => {
    expect( hash ).to.be.a( 'function' );
  });

  describe( '.call', () => {
    describe( '[returned value]', () => {
      let instance = hash();

      describe( '.process', () => {
        it( 'should be a function', () => {
          expect( instance.process ).to.be.a( 'function' );
        });

        it( 'should hash path', () => {
          let test = {
            src: 'path/to/file.png',
            path: 'path/to/file.png'
          };
          const expected = '13ba70d38d46141a62b8d2062e0e533d.png';
          instance.process( test );
          expect( test.path ).to.equal( expected );
        });
      });
    });
  });
});
