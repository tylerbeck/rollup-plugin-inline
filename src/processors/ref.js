import { objectExports } from '../util/Helpers';

export default function( options = {} ) {
	const process = obj => {
	  obj.code = objectExports( obj );
	  return obj;
	}

	return { process };
}
