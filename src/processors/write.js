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
      const test = options.test || (p => {
        return true;
      });
      if ( contents ) {
        obj.write = path => test( path ) && outputFileAsync( join( path, objPath ), contents, encoding );
      }
      return obj;
    }
	};
}
