import test from 'ava';
import { f, b, r, p, pi } from '../';

let wR = r.Role.rook.color(r.Color.white);
let wK = r.Role.king.color(r.Color.white);

test('export', t => {
  t.is(b.Board.make([
    wR.on(p.Pos.h1),
    wK.on(p.Pos.e1),
    wR.on(p.Pos.f1)
  ]).fen, '8/8/8/8/8/8/8/4KR1R');
});

test('castles', t => {
  
  let situation = f.situation('8/8/8/8/8/8/8/R3K2R w - - 0 1');
  if (situation) {
    t.true(situation.board.get(p.Pos.a1)?.piece.equals(wR));
    t.true(situation.board.get(p.Pos.e1)?.piece.equals(wK));
    t.true(situation.board.get(p.Pos.h1)?.piece.equals(wR));
  } else {
    t.fail('couldnt parse fen');
  }
});

test('fen', t => {

  let { black } = r.Color;
  let wK = pi.Piece.key('K'),
  bK = pi.Piece.key('k'),
  b5 = p.Pos.key('b5'),
  e6 = p.Pos.key('e6');
  let situation = f.situation('8/8/4k3/1K6/8/8/8/8 b - - 0 1');
  t.log(situation);
  if (situation) {
    t.true(situation.equals(b.Board.make([
      bK.on(e6),
      wK.on(b5)
    ]).situation(black)));
  } else {
    t.fail('couldnt parse fen');
  }
});
