import rollup from 'rollup';
//import babel from 'rollup-plugin-babel';

import { verifyInputProperties } from '../util/ProcessorHelpers';

export default function roll( options = {}) {
  options.format = options.format || 'es6';
	return {
		process( obj ) {
      verifyInputProperties( obj, 'src' );
      return rollup.rollup({
        entry: obj.src,
        plugins: [
          // babel({
        	// 		sourceMap: true,
        	// }),
          options.inlineInterface
        ]
      }).then( bundle => {
        let generated = bundle.generate({ format: options.format });
        obj.code = generated.code;
        return obj;
      });
    }
	};
}
