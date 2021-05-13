import { Situation } from '../situation';
import { Analysis } from './analysis';
import { Pressure } from './pressure';
import { PawnPush } from './pawnpush';
import { Move, isMove } from '../move';
import { UciOrCastles } from '../uci';
import { isCastles, Castles } from '../san';

export function movePawnPush(situation: Situation, pawnPush: PawnPush): Maybe<Move> {
  let afterBoard = situation.board.move(pawnPush.pos,
                                        pawnPush.to);
  if (afterBoard) {
    return Move.make(
      pawnPush.piese.piece,
      situation,
      afterBoard,
      pawnPush.pos,
      pawnPush.to);
  }
}

export function move(situation: Situation, pressure: Pressure): Maybe<Move> {
  let afterBoard = situation.board.move(pressure.pos,
                                        pressure.to);
  if (afterBoard) {
    return Move.make(
      pressure.piese.piece,
      situation,
      afterBoard,
      pressure.pos,
      pressure.to,
      pressure.captures?pressure.to:undefined);
  }
}

export function uciOrCastles(uciOrCastles: UciOrCastles): (_: Move) => boolean {
  if (isCastles(uciOrCastles)) {
    if (uciOrCastles.equals(Castles.short)) {
      
    } else if (uciOrCastles.equals(Castles.long)) {
    }
    return (move: Move) => false;
  } else {
    return (move: Move) =>
      move.orig.equals(uciOrCastles.orig) &&
      move.dest.equals(uciOrCastles.dest) &&
      (uciOrCastles.promotion===move.promotion ||
        !!uciOrCastles.promotion&&!!move.promotion&&
        move.promotion.equals(uciOrCastles.promotion));
  }
}
