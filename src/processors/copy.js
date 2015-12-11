import { copyAsync } from  'fs-extra-promise';
import { join } from  'path';
import { verifyInputProperties } from '../util/ProcessorHelpers';

export default function copy( options = {}) {
	return {
		process( obj ) {
      verifyInputProperties( obj, 'src', 'path' );
      const src = obj.src;
      const objPath = obj.path;
      obj.generate = path => copyAsync( src, join( path, objPath ) );
      return obj;
    }
	};
}
