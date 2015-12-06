import { requireOptions } from '../util/Helpers';

export default function( options = {}) {
  requireOptions( options, 'processors' );
  const resolve = () => options.processors.reverse();
	const process = obj => obj;
	return { resolve, process };
}
