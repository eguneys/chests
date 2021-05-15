import AnyVal from './anyval';
import { Board } from './board';
import { Color } from './role';
import { UciOrCastles } from './uci';
import { SanOrCastles, isCastles } from './san';
import { Move, isMove } from './move';
import { Analysis } from './actor/analysis';
import { moveCastles, movePawnPush, move, uci, san, orCastles } from './actor/mover';

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

    let pawnpushes = this.analysis.ourPawnPushes
      .map(_ => movePawnPush(this, _));
    
    let directs = this.analysis.ourDirectPressures
      .filter(_ => !_.emptyPawnCapture)
      .map(_ => move(this, _));

    let castles = this.analysis.ourCastles
      .map(_ => moveCastles(this, _));

    return pawnpushes.concat(directs).concat(castles)
      .filter(isMove)
      .filter(_ => _.after.analysis.noKingCapture);

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
    let filter = isCastles(move)?orCastles(move):uci(move);
    return this.moves.find(filter);
  }

  sanOrCastles(move: SanOrCastles) {
    let filter = isCastles(move)?orCastles(move):san(move);
    return this.moves.find(filter);
  }  
}
