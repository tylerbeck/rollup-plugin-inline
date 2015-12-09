import a from 'ref( ./a.js )';
import b from 'ref( ./b.js )';
import c from 'ref( ./c.js )';

var contents = [ a.path, b.path, c.path ].join( '|' );

export { contents };
