import test from 'ava';

import { p, dir } from '../';

test('position', t => {

  let e4 = p.Pos.key('e4');

  t.true(e4.file.equals(dir.File.e));
  
});
