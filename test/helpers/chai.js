const chai = require( 'chai' );
const sinon = require( 'sinon' );
const sinonChai = require( 'sinon-chai' );
const chaiAsPromised = require( 'chai-as-promised' );

chai.use( sinonChai );
chai.use( chaiAsPromised );

chai.config.includeStack = true;

global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;
global.sinon = sinon;
