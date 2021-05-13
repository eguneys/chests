import { Piece } from './piece';
import { Situation } from './situation';
import { Pos } from './pos';
import { Role } from './role';
import { Castles } from './san';
import { Board } from './board';
import { Color } from './role';

export class Move {

  static make = (piece: Piece,
                 before: Situation,
                 afterBoard: Board,
                 orig: Pos,
                 dest: Pos,
                 capture?: Pos,
                 promotion?: Role,
                 castle?: Castles,
                 enpassant?: Pos): Move => {
    return new Move(piece,
                    before,
                    afterBoard,
                    orig,
                    dest,
                    capture,
                    promotion,
                    castle,
                    enpassant);                    
  }
  
  piece: Piece
  before: Situation
  after: Situation
  orig: Pos
  dest: Pos
  capture?: Pos
  promotion?: Role
  castle?: Castles
  enpassant?: Pos

  get afterBoard(): Board {
    return this.after.board;
  }

  get beforeBoard(): Board {
    return this.before.board;
  }

  get beforeTurn(): Color {
    return this.before.turn;
  }

  get afterTurn(): Color {
    return this.after.turn;
  }

  get uci(): string {
    return this.orig.key as string + this.dest.key as string + (this.promotion?.promotionS || '');
  }

  get san(): string {
    if (this.castle?.equals(Castles.short)) {
      return 'O-O';
    } else if (this.castle?.equals(Castles.long)) {
      return 'O-O-O';
    }

    let ambigiousFile = false,
    ambigiousRank = false,
    pawnCapture = this.capture && this.piece.is(Role.pawn),
    pawnCaptureOrAmbigiousFile = pawnCapture || ambigiousFile;

    let pieceS = this.piece.sanS,
    fileS = pawnCaptureOrAmbigiousFile?this.orig.file.key:'',
    rankS = ambigiousRank?this.orig.rank.key:'',
    captureS = this.capture?'x':'',
    toS = this.dest.key,
    promotionS = this.promotion?`=${this.promotion.promotionS}`:'',
    checkS = '',
    mateS = '';

    return [pieceS, fileS, rankS, captureS, toS, promotionS, checkS, mateS].join('');
    
  }

  constructor(piece: Piece,
              before: Situation,
              afterBoard: Board,
              orig: Pos,
              dest: Pos,
              capture?: Pos,
              promotion?: Role,
              castle?: Castles,
              enpassant?: Pos) {
    this.piece = piece;
    this.before = before;
    this.orig = orig;
    this.dest = dest;
    this.capture = capture;
    this.promotion = promotion;
    this.castle = castle;
    this.enpassant = enpassant;

    this.after = Situation.make(afterBoard,
                                piece.color.opposite);
  }

}

export function isMove(_: any): _ is Move {
  return (_ && (_ as Move).before !== undefined);
}
