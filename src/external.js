import { createFilter } from 'rollup-pluginutils';
import { resolve, dirname, relative } from 'path';
import { parse } from './util/AST';
import { requireOptions } from './util/Helpers';

import alias from './processors/alias';
import hash from './processors/hash';
import ref from './processors/ref';
import write from './processors/write';

const matchId = /^\s*([a-z0-9_-]+)\s*\((.*)\)\s*$/i;

function ensureProcessors( processors ) {
  //console.log( 'ensureProcessors', processors );
  processors = processors || {};
  if ( !processors.ref ) {
    processors.ref = ref();
  }
  return processors;
}

function parseImport( statement ) {
  //console.log( 'parseImport:', statement );
  let list = [];
  while ( matchId.test( statement ) ) {
    //console.log( '   ', statement );
    const match = statement.match( matchId );
    list.push( match[ 1 ] );
    statement = match[ 2 ];
  }
  if ( list.length ) {
    //console.log( '   ', list, statement );
    const path = statement.trim();
    return {
      processors: list.reverse(),
      src: path,
      path
    };
  }

  return null;
}

function expandProcessors( list, processors ) {
  let expanded = [];
  list.forEach( name => {
    const processor = processors[ name ];
    let insert = [ name ];
    if ( !processor ) {
      throw new Error( `could not resolve processor: ${name}` );
    }
    if ( processor.resolve && typeof processor.resolve === 'function' ) {
      insert = processor.resolve();
      insert = insert.reduce(
        (ins, current) => ins.concat(
          current === name ? [ name ] : expandProcessors([ current ], processors )
        ),
        []
      );
    }
    expanded = expanded.concat( insert );
  });
  return expanded;
}

function external( options = {}) {
  requireOptions( options, 'processors' );

  const processors = ensureProcessors( options.processors );
  const types = Object.keys( processors );

  //console.log('registered processors:', types);
  const filter = createFilter( options.include, options.exclude );
  const writes = {};

  return {
    resolveId( importee, importer ) {
      //console.log( 'resolveId:', importee, importer );
      const parsed = parseImport( importee );
      if ( parsed && parsed.processors.every( type => processors[ type ] ) ) {
        const dir = dirname( importer );
        const path = relative( process.cwd(), resolve( dir, parsed.src.trim() ) );
        const resolvedId = parsed.processors
        .reduce( ( value, current ) => `${current}(${value})`, path );

        //console.log('  resolvedId', resolvedId);
        return resolvedId;
      }

      return null;
    },

    load( id ) {
      //console.log( 'load:', id );
      const resolved = parseImport( id );
      if ( !resolved || !filter( id ) ) {
        return null;
      }

      const processList = expandProcessors( resolved.processors, processors );
      //console.log( 'processList:', processList );
      const loadResult = processList
        .map( type => processors[ type ] )
        .reduce(
          ( value, processor ) => Promise.all([ value ]).then( v => processor.process( v[ 0 ] ) ),
          resolved
        )
        .then(
          value => !value.code ? processors.ref.process( value ) : value,
          e => { throw e; }
        );

      loadResult.then( value => {
        if ( value.write ) {
          writes[ id ] = value.write;
        }
      });

      return loadResult;
    },

    write( path = './' ) {
      return Promise.all( Object.keys( writes ).map( id => writes[ id ]( path ) ) );
    }
  };
}

external.alias = alias;
external.hash = hash;
external.alias = alias;
external.ref = ref;

export default external;
