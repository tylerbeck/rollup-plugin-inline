import { md5Hash } from '../util/Helpers';
import { extname, join } from 'path';
import { verifyInputProperties } from '../util/ProcessorHelpers';

export default function( options = {}) {
	const process = obj => {
    verifyInputProperties( obj, 'path' );
    const extension = extname( obj.path );
	  obj.path = `${md5Hash( obj.path + Date.now() )}${extension}`;
	  return obj;
	};

	return { process };
}
