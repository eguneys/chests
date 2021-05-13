import test from 'ava';
import { readMate1, readMate2 } from './_read';
import { uciOrCastles, situation, Analysis, isMove, mover } from '../../';

test.skip('debug', t => {

  let _sit = situation('1r3rk1/2p1qppb/p2n4/1p2p1Pp/4Qn1P/2P1N3/PPB2P1K/3R2R1 w - - 0 1')!;

  let mate = _sit.uciOrCastles(uciOrCastles('e4h7')!)!.after;

  t.log(mate.mate);
  
});

test('matein1', async t => {

  let lines = await readMate1();

  lines.forEach(({fen, moves}: any) => {

    let [move, expected] = moves.split(' ').map(uciOrCastles);

    let after = situation(fen)!.uciOrCastles(move)!.after;

    let mates = after.moves.filter(_ => _.after.mate)
      .filter(_ => _.after.mate)
      .map(_ => _.uci)
    
    t.true(mates.includes(expected.uci));
    t.log(fen, mates, expected.uci);
  });
  
});

test('matein2', async t => {

  let lines = await readMate2();

  lines.forEach(({fen, moves}: any) => {

    let [move, expected, move2, mate] = moves.split(' ').map(uciOrCastles);

    let after = situation(fen)!.uciOrCastles(move)!.after;

    t.log(after.fen, moves);
  });
  
});
