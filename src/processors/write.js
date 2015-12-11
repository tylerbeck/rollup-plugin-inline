import { outputFileAsync } from  'fs-extra-promise';
import { join } from  'path';
import { verifyInputProperties } from '../util/ProcessorHelpers';

export default function write( options = {}) {
  options.encoding = options.encoding || 'utf8';
	return {
		process( obj ) {
      verifyInputProperties( obj, 'contents', 'path' );
      const objPath = obj.path;
      const contents = obj.contents;
      const encoding = options.encoding;
      if ( contents ) {
        obj.generate = path => outputFileAsync( join( path, objPath ), contents, encoding );
      }
      return obj;
    }
	};
}
