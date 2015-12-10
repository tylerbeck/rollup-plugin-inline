import { copyAsync } from  'fs-extra-promise';
import { join } from  'path';
import { verifyInputProperties } from '../util/ProcessorHelpers';

export default function copy( options = {}) {
	return {
		process( obj ) {
      verifyInputProperties( obj, 'src', 'path' );
      obj.generate = path => copyAsync( obj.src, join( path, obj.path ) );
      return obj;
    }
	};
}
