import test from 'ava';
import { p, pi, b } from '../';

test('board', t => {

  let wK = pi.Piece.key('K'),
  bK = pi.Piece.key('k'),
  a1 = p.Pos.key('a1'),
  c2 = p.Pos.key('c2');
  
  let board = b.Board.make([
    wK.on(a1),
    bK.on(c2)
  ]);

  t.true(board.get(a1)?.piece.equals(wK));
  
  
});
