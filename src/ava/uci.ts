import test from 'ava';
import { uciOrCastles, Castles, Uci, Pos, Role } from '../';

test('uci', t => {

  let long = uciOrCastles('0-0-0') as Castles;

  if (long) {
    t.true(long.equals(Castles.long));
  } else {
    t.fail('couldnt parse 0-0-0');
  }

  let d2d4 = uciOrCastles('d2d4=Q') as Uci;

  if (d2d4) {
    t.true(d2d4.orig.equals(Pos.d2));
    t.true(d2d4.dest.equals(Pos.d4));
    t.true(d2d4.promotion?.equals(Role.queen));
  } else {
    t.fail('couldnt parse d2d4=Q');
  }
  
  
});
