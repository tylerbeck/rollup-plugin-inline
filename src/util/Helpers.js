import { createHash } from 'crypto';

export function chainFunctions( fnList, ...initialArgs ) {
  return fnList.reduce( ( args, fn ) => {
    const result = fn( ...args );
    return Array.isArray( result ) ? result : [ result ];
  }, initialArgs )[ 0 ];
}

export function hasAttribute( obj, attrs ) {
  let options = [];
  if ( typeof attrs === 'string' ) {
    options.push( attrs );
  } else if ( Array.isArray( attrs ) ) {
    options = options.concat( attrs );
  }
  return options.some( attr => {
    const chain = attr.split( '.' );
    const prop = chain[ 0 ];
    if ( typeof obj[ prop ] === 'undefined' ) {
      return false;
    } else if ( chain.length > 1 ) {
      return hasAttribute( obj[ prop ], chain.slice( 1 ).join( '.' ) );
    }
    return true;
  });
}

export function hasAttributes( obj, ...list ) {
  return Array.from( list ).every( attr => {
    return hasAttribute( obj, attr );
  });
}

export function requireOptions( options, ...required ) {
  if ( !hasAttributes( options, ...required ) ) {
    throw new Error( 'MISSING_OPTIONS' );
  }
}

export function resolveWith( ...args ) {
  return new Promise( ( resolve ) => {
    setTimeout( () => {
      resolve( ...args );
    }, 0 );
  });
}

export function rejectWith( ...args ) {
  return new Promise( ( respond, reject ) => {
    setTimeout( () => {
      reject( ...args );
    }, 0 );
  });
}

export function filterKeys( obj, ...filter ) {
  return Object.keys( obj )
    .filter( key => filter.indexOf( key ) < 0 )
    .reduce( ( copy, key ) => {
      copy[ key ] = obj[ key ];
      return copy;
    }, {});
}

export function objectExports( obj, ...filter ) {
  const filters = [ 'code', 'ast', 'write' ].concat( filter );
  return Object.keys( obj )
    .filter( key => filters.indexOf( key ) < 0 )
    .reduce( ( exports, key ) => {
      exports.push( `export const ${ key } = ${ JSON.stringify( obj[ key ] ) };` );
      return exports;
    }, [ `export default ${ JSON.stringify( obj ) };` ])
    .join( '\n' );
}

export function md5Hash( str ) {
  let md5sum = createHash( 'md5' );
  md5sum.update( str );
  return md5sum.digest( 'hex' );
}
