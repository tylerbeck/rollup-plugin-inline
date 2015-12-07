import { copyAsync } from  'fs-extra-promise';
import { join } from  'path';

export default function write( options = {}) {
	return {
		process( obj ) {
      obj.write = path => {
				const dest = join( path, obj.path );
				return copyAsync( obj.src, dest );
			};
      return obj;
    }
	};
}
