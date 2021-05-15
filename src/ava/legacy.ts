import test from 'ava';
import { initial, situation, Situation, sanOrCastles } from '../';

export function playMoves(moves: string, s: Situation = situation(initial)!) {
  return moves.split(' ')
    .map(sanOrCastles)
    .map(_ => _!)
    .reduce((s, _) => {
      let _s = s.sanOrCastles(_)!;
      if (!_s) {
        throw 'No situation for ' + _.key;
      }
      return _s.after
    }, s);
}

export function playMove(s: Situation, move: string) {
  return s.sanOrCastles(sanOrCastles(move)!)!;
}

test('jump over', t => {
  let b2d4 = situation('2r1k2r/pp1bbppp/1qn1p2n/3pP3/3p1P2/P1P2N2/1PB3PP/RNBQ1RK1 w k - 0 11')!;

  t.is(playMove(b2d4, 'cxd4').san, 'cxd4');
});

test('jump over2', t => {
  let fe1 = situation('r1bqkb1r/pp2nppp/4p3/3pP3/3p4/3B4/PPP2PPP/RNBQ1RK1 w KQkq - 0 1')!;

  t.is(playMove(fe1, 'Re1').san, 'Re1');
});


test('castles', t => {
  let OO = playMoves('d4 e6 c4 d5 g3 Nf6 Bg2 Be7 O-O');

  t.is(playMove(OO, 'O-O').san, 'O-O');
});

test('Qxf7', t => {
  let Qf3 = playMoves('e4 e5 Qf3 a6');

  t.is(playMove(Qf3, 'Qxf7').san, 'Qxf7');
});

// test('capture promotion', t => {
//   let f8Q = situation('5n2/4P3/8/8/8/8/8/8 w - - 0 1')!;

//   t.is(playMove(f8Q, 'exf8=Q').san, 'exf8=Q');
// });
