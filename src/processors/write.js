import { copyAsync } from  'fs-extra-promise';
import { join } from  'path';

export default function write( options = {}) {
	return {
		process( obj ) {
      obj.write = path => copyAsync( obj.src, join( path, obj.path ) );
      return obj;
    }
	};
}
