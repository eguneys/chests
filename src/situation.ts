import AnyVal from './anyval';
import { Board } from './board';
import { Color } from './role';
import { UciOrCastles } from './uci';
import { isCastles } from './san';
import { Move, isMove } from './move';
import { Analysis } from './actor/analysis';
import { move, uciOrCastles } from './actor/mover';

export class Situation extends AnyVal {
  
  static make = (board: Board, color: Color): Situation => new Situation(board, color);
  
  readonly board: Board
  readonly turn: Color

  get fen(): string {
    let rest = "KQkq - 0 1";
    rest = '- - 0 1';
    return `${this.board.fen} ${this.turn.key} ${rest}`;
  }

  get analysis(): Analysis {
    return Analysis.make(this);
  }

  get moves(): Array<Move> {
    return this.analysis.ourDirectPressures
      .map(_ => move(this, _))
      .filter(isMove)
      .filter(_ => _.after.analysis.noKingCapture)
  }

  get check(): boolean {
    return this.analysis.theirChecks.length > 0;
  }

  get mate(): boolean {
    return this.check && this.moves.length === 0;
  }

  constructor(board: Board, turn: Color) {
    super(AnyVal.combine(board.key, turn.key));

    this.board = board;
    this.turn = turn;
  }

  uciOrCastles(move: UciOrCastles) {
    return this.moves.find(uciOrCastles(move));
  }
  
}
