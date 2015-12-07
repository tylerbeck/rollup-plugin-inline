import { src as aPath } from 'ref( ./modules/a )';
import { src as bPath } from 'ref( ./modules/b )';
import { src as cPath } from 'ref( ./modules/c )';
import { path } from 'asset( ./assets/img.png )';

console.log( 'a:', aPath );
console.log( 'b:', bPath );
console.log( 'c:', cPath );
