import { filterKeys, hasAttributes } from './Helpers.js';
import { MISSING_ATTR } from './Errors';

export function objectExports( obj, ...filter ) {
  const filters = [ 'code', 'ast', 'generate', 'processors' ].concat( filter );
  return Object.keys( obj )
    .filter( key => filters.indexOf( key ) < 0 )
    .reduce( ( exports, key ) => {
      exports.push( `export const ${ key } = ${ JSON.stringify( obj[ key ] ) };` );
      return exports;
    }, [ `export default ${ JSON.stringify( filterKeys( obj, ...filters ) ) };` ])
    .join( '\n' );
}

export function verifyInputProperties( obj, ...required ) {
  if ( !hasAttributes( obj, ...required ) ) {
    throw new Error( MISSING_ATTR );
  }
}
