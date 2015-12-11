import babel from 'rollup-plugin-babel';

var external = Object.keys( require( './package.json' ).dependencies );

export default {
	entry: 'src/inline.js',
	plugins: [
		babel({
			sourceMap: true
		})
	],
	external: external,
	sourceMap: true
};
