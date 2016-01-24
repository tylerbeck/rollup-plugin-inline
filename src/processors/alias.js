export default function( ...processors ) {
  //TODO: enable passing in an anonymous processor functions in addition to named
  const resolve = () => processors.slice( 0 );
	const process = obj => obj;
	return { resolve, process };
}
