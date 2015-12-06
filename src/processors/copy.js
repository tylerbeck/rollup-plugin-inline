import { objectExports, md5Hash } from '../util/Helpers';
import { join, basename, extname } from 'path';
import { copyAsync } from  'fs-extra-promise';

export default function copy( options = {}) {

	const rename = options.rename || ( name => options.flatten ? basename( name ) : name );

	return {
		load( obj ) {
			console.log( 'copy.load', obj );
			let name = rename( obj.target );
			name = options.hash ? `${md5Hash( name + Date.now() )}_${name}` : name;
			obj.path = join( options.dest || './', name );
			return new Promise( ( resolve, reject ) => {
				resolve({
					code: objectExports( obj ),
					write: path => {
						const dest = join( path, obj.path );
						console.log( `generating files for ${obj.target} -> ${obj.path}` );
						return copyAsync( obj.target, dest );
					},
					data: obj
				});
			});
    }
	};
}
