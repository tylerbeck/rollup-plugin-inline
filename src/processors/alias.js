import { requireOptions } from '../util/Helpers';

export default function( ...processors ) {
  const resolve = () => processors.reverse();
	const process = obj => obj;
	return { resolve, process };
}
