import { readFileAsync } from  'fs-extra-promise';
import { verifyInputProperties } from '../util/ProcessorHelpers';

export default function read( options = {}) {
  options.encoding = options.encoding || 'utf8';
	return {
		process( obj ) {
      verifyInputProperties( obj, 'src' );
      const src = obj.src;
      return readFileAsync( obj.src, options.encoding ).then( str => {
        //console.log( 'readFileAsync:', str );
        obj.contents = str;
        return obj;
      });
    }
	};
}
