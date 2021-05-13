import test from 'ava';

import { sanOrCastles, Castles, San, Pos, File } from '../';

test('san', t => {

  let short = sanOrCastles('0-0') as Castles;

  if (short) {
    t.true(short.equals(Castles.short));
  } else {
    t.fail('couldnt parse 0-0');
  }
  
  let Nf6 = sanOrCastles('Naf6') as San;

  if (Nf6) {
    t.true(Nf6.to.equals(Pos.f6));
    t.true(Nf6.file?.equals(File.a));
  } else {
    t.fail('couldnt parse Naf6');
  }
});
