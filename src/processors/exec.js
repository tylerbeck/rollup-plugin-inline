import _eval from 'eval';

export default function exec( options = {}) {
	return {
    resolve() {
      return [ 'rollcjs', 'exec' ];
    },

		process( obj ) {
      let module = _eval( obj.code, '[EvaluatedModule]', {}, true );
      Object.keys( module ).forEach( key => {
         obj[ key ] = module[ key ];
      });
      return obj;
    }
	};
}
