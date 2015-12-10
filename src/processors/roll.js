import rollup from 'rollup';
import { verifyInputProperties } from '../util/ProcessorHelpers';

export default function roll( options = {}) {
  options.format = options.format || 'es6';
	return {
		process( obj ) {
      verifyInputProperties( obj, 'src' );
      return rollup.rollup({
        entry: obj.src,
        plugins: [ options.externalInterface ]
      }).then( bundle => {
        let generated = bundle.generate({ format: options.format });
        obj.code = generated.code;
        return obj;
      });
    }
	};
}
