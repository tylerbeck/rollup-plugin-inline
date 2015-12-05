export default function( options = {} ) {
  const resolve = () => options.processors.reverse();
	const process = obj => obj;
	return { resolve, process };
}
