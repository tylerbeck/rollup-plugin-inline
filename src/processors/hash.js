import { md5Hash } from '../util/Helpers';
import { extname, join } from 'path';

export default function( options = {}) {
	const process = obj => {
    const extension = extname( obj.path );
	  obj.path = `${md5Hash( obj.path + Date.now() )}${extension}`;
	  return obj;
	};

	return { process };
}
