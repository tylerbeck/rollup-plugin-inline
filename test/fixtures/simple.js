import { src as aPath } from 'ref( ./modules/a.js )';
import { src as bPath } from 'ref( ./modules/b.js )';
import { src as cPath } from 'ref( copy( ./modules/c.js ))';
import { path } from 'asset( ./assets/img.png )';

console.log( 'a:', aPath );
console.log( 'b:', bPath );
console.log( 'c:', cPath );
console.log( 'img:', path );
