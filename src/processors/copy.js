import { copyAsync } from  'fs-extra-promise';
import { join } from  'path';

export default function copy( options = {}) {
	return {
		process( obj ) {
      obj.generate = path => copyAsync( obj.src, join( path, obj.path ) );
      return obj;
    }
	};
}
