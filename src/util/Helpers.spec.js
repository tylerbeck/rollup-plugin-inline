import * as Helpers from './Helpers';
import { MISSING_OPTIONS } from './Errors';

describe( 'Helpers', () => {

  const obj = {
    truthy: '1',
    falsey: 0,
    false: false,
    nested: {
      truthy: 1,
      falsey: '',
      false: false,
      nested: {
        truthy: 1,
        falsey: '',
        false: false
      }
    }
  };

  describe( '.chainFunctions', () => {
    it( 'should have method chainFunctions', () => {
      expect( Helpers.chainFunctions ).to.be.a( 'function' );
    });
    it( 'should execute all methods passed in fnList argument', () => {
      const f1 = sinon.stub().returns([ 1, 'b' ]);
      const f2 = sinon.stub().returns([ 2, 'c' ]);
      const f3 = sinon.stub().returns([ 3, 'd' ]);
      const f4 = sinon.stub().returns([ 4, 'e' ]);

      const result = Helpers.chainFunctions([ f1, f2, f3, f4 ], 0, 'a' );

      expect( f1 ).to.have.been.calledWith( 0, 'a' );
      expect( f2 ).to.have.been.calledWith( 1, 'b' );
      expect( f3 ).to.have.been.calledWith( 2, 'c' );
      expect( f4 ).to.have.been.calledWith( 3, 'd' );
      expect( result ).to.eql( 4 );
    });
  });

  describe( '.hasAttribute', () => {
    it( 'should have method hasAttribute', () => {
      expect( Helpers.hasAttribute ).to.be.a( 'function' );
    });

    it( 'should return true if an attribute chain is not undefined', () => {
      expect( Helpers.hasAttribute( obj, 'truthy' ) ).to.be.true;
      expect( Helpers.hasAttribute( obj, 'falsey' ) ).to.be.true;
      expect( Helpers.hasAttribute( obj, 'false' ) ).to.be.true;
      expect( Helpers.hasAttribute( obj, 'nested.truthy' ) ).to.be.true;
      expect( Helpers.hasAttribute( obj, 'nested.falsey' ) ).to.be.true;
      expect( Helpers.hasAttribute( obj, 'nested.false' ) ).to.be.true;
      expect( Helpers.hasAttribute( obj, 'nested.nested.truthy' ) ).to.be.true;
      expect( Helpers.hasAttribute( obj, 'nested.nested.falsey' ) ).to.be.true;
      expect( Helpers.hasAttribute( obj, 'nested.nested.false' ) ).to.be.true;
    });

    it( 'should not return true if an attribute chain is undefined', () => {
      expect( Helpers.hasAttribute( obj, 'immediateNoDef' ) ).to.be.false;
      expect( Helpers.hasAttribute( obj, 'nested.noDef' ) ).to.be.false;
      expect( Helpers.hasAttribute( obj, 'nested.noDef.noDef' ) ).to.be.false;
      expect( Helpers.hasAttribute( obj, 'nested.nested.noDef' ) ).to.be.false;
    });

    it( 'should return true if any attribute in group exists', () => {
      expect( Helpers.hasAttribute( obj, [ 'truthy', 'immediateNoDef' ]) ).to.be.true;
      expect( Helpers.hasAttribute( obj, [ 'nested.truthy', 'nested.nested.noDef' ]) ).to.be.true;
    });
  });

  describe( '.hasAttributes', () => {
    it( 'should have method hasAttributes', () => {
      expect( Helpers.hasAttributes ).to.be.a( 'function' );
    });
    it( 'should return true if all attributes are defined', () => {
      const props = [
        'truthy',
        'falsey',
        'false',
        'nested.truthy',
        'nested.falsey',
        'nested.false',
        'nested.nested.truthy',
        'nested.nested.falsey',
        'nested.nested.false'
      ];
      expect( Helpers.hasAttributes( obj, ...props ) ).to.be.true;
    });
    it( 'should return false if any attributes are not defined', () => {
      const props = [
        'truthy',
        'falsey',
        'false',
        'nested.truthy',
        'nested.falsey',
        'nested.false',
        'nested.nested.truthy',
        'nested.nested.falsey',
        'nested.nested.false',
        'nested.nested.noDef'
      ];
      expect( Helpers.hasAttributes( obj, ...props ) ).to.be.false;
    });
  });

  describe( '.requireOptions', () => {
    it( 'should throw error if options are missing', () => {
      const list = [ 'falsey', 'nested.truthy', 'nested.noDef' ];
      expect( Helpers.requireOptions.bind( null, obj, ...list ) )
        .to.throw( MISSING_OPTIONS );
    });
    it( 'should not throw error if options are set', () => {
      const list = [ 'falsey', 'nested.truthy', 'nested.nested.false' ];
      expect( Helpers.requireOptions.bind( null, obj, ...list ) ).to.not.throw( Error );
    });
  });

  describe( '.resolveWith', () => {
    it( 'should return a promise that resolves with specified value', () => {
      const value = 'resolved value';
      return expect( Helpers.resolveWith( value ) ).to.eventually.equal( value );
    });
  });

  describe( '.rejectWith', () => {
    it( 'should return a promise that rejects with specified value', () => {
      const value = 'resolved value';
      return expect( Helpers.rejectWith( value ) ).to.eventually.be.rejected;
    });
  });

  describe( '.filterKeys', () => {

  });

  describe( '.objectExports', () => {

  });

  describe( '.md5Hash', () => {

  });
});
