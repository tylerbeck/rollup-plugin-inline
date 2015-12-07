import { objectExports } from '../util/ProcessorHelpers';

export default function( options = {}) {
	const process = obj => {
	  obj.code = objectExports( obj );
	  return obj;
	};

	return { process };
}
