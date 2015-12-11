import { requireOptions } from '../util/Helpers';

export default function( ...processors ) {
  //TODO: enable passing in an anonymous processor functions in addition to named
  const resolve = () => processors.reverse();
	const process = obj => obj;
	return { resolve, process };
}
