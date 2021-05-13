import test from 'ava';
import { pi, r } from '../';

test('piece', t => {

  let wR = pi.Piece.key('R'),
  rook = r.Role.key('r'),
  w = r.Color.key('w');
  
  t.true(wR.equals(rook.color(w)));

  t.true(wR.role.equals(rook));
  t.true(wR.color.equals(w));
  
});
