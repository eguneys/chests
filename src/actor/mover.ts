import { Maybe } from '../types';
import { Situation } from '../situation';
import { Analysis } from './analysis';
import { Pressure } from './pressure';
import { PawnPush } from './pawnpush';
import { CastlesOn } from './castle';
import { Move, isMove } from '../move';
import { Uci, UciOrCastles } from '../uci';
import { San, SanOrCastles, isCastles, Castles } from '../san';

export function moveCastles(situation: Situation, castles: CastlesOn): Maybe<Move> {

  let afterBoard = situation.board.castle(castles.origKingPos,
                                          castles.destKingPos,
                                          castles.origRookPos,
                                          castles.destRookPos);

  if (afterBoard) {
    return Move.make(
      castles.piese.piece,
      situation,
      afterBoard,
      castles.origKingPos,
      castles.destKingPos,
      undefined,
      undefined,
      castles.castles
    );    
  }
  
}

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

export function orCastles(castles: Castles): (_: Move) => boolean {
  return (move: Move) =>
    move.castle?.equals(castles) || false;
}

export function san(san: San): (_: Move) => boolean {
  return (move: Move) => {
    return (san.file?move.orig.file.equals(san.file):true) &&
      (san.rank?move.orig.rank.equals(san.rank):true) &&
      san.role.equals(move.piece.role) &&
      move.dest.equals(san.to) &&
      (san.promotion===move.promotion ||
        !!san.promotion&&!!move.promotion&&
        move.promotion.equals(san.promotion));
  }
}

export function uci(uci: Uci): (_: Move) => boolean {
  return (move: Move) =>
    move.orig.equals(uci.orig) &&
    move.dest.equals(uci.dest) &&
    (uci.promotion===move.promotion ||
      !!uci.promotion&&!!move.promotion&&
      move.promotion.equals(uci.promotion));
}
