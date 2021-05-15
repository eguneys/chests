import test from 'ava';
import { readMate1, readMate2 } from './_read';
import { uciOrCastles, situation, Analysis, isMove, mover } from '../../';

test.skip('debug', t => {

  let _sit = situation('1r6/5k2/2p1pNp1/p5Pp/1pQ1P2P/2P4R/KP3P2/3q4 w - - 4 31')!;

  let mate = _sit.uciOrCastles(uciOrCastles('c4c6')!)!.after;

  let mateIn2s = mate.moves
    .filter(_ => _.after.moves.every(_ =>
      _.after.moves.some(_ => _.after.mate)))
    .map(_ => _.uci)

  t.log(mate.uciOrCastles(uciOrCastles('b4b3')!));
  
});

test('matein1', async t => {

  let lines = await readMate1();

  lines.forEach(({fen, moves}: any) => {

    let [move, expected] = moves.split(' ').map(uciOrCastles);

    let after = situation(fen)!.uciOrCastles(move)!.after;

    let mates = after.moves
      .filter(_ => _.after.mate)
      .map(_ => _.uci)
    
    t.true(mates.includes(expected.uci));
    t.log(fen, mates, expected.uci);
  });
  
});

test.skip('matein2', async t => {

  let lines = await readMate2();

  lines.forEach(({fen, moves}: any) => {

    let [move, expected, move2, mate] = moves.split(' ').map(uciOrCastles);

    let after = situation(fen)!.uciOrCastles(move)!.after;

    let mateIn2s = after.moves
      .filter(_ => _.after.moves.every(_ =>
        _.after.moves.some(_ => _.after.mate)))
      .map(_ => _.uci)
    
    t.true(mateIn2s.includes(expected.uci));
    t.log(fen, mateIn2s, expected.uci, mateIn2s.includes(expected.uci));
  });
  
});
