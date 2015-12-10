import { outputFileAsync } from  'fs-extra-promise';
import { join } from  'path';
import { verifyInputProperties } from '../util/ProcessorHelpers';

export default function write( options = {}) {
  options.encoding = options.encoding || 'utf8';
	return {
		process( obj ) {
      verifyInputProperties( obj, 'contents', 'path' );
      obj.generate = path => {
        console.log( 'writing to:', join( path, obj.path ) );
        return outputFileAsync( join( path, obj.path ), obj.contents, options.encoding );
      };
      return obj;
    }
	};
}
