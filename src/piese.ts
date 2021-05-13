import AnyVal from './anyval';
import { Piece } from './piece';
import { Pos } from './pos';
import { Color, Role } from './role';
import { D1, D2 } from './disp';
import { Route } from './route';
import { d2Map,
         d2CapturesMap,
         pawnPromoteRanks,
         pawn2ProjectionRanks,
         regularProjectionMap } from './misc';

export class Piese extends AnyVal {

  static make = (piece: Piece, pos: Pos) => new Piese(piece, pos);

  readonly piece: Piece
  readonly pos: Pos

  get color(): Color {
    return this.piece.color;
  }
  
  get promotes(): boolean {
    return this.piece.is(Role.pawn) &&
      this.pos.equals(pawnPromoteRanks.get(this.piece.color));
  }

  get projection(): number {
    return this.piece.is(Role.pawn) &&
      this.pos.equals(pawn2ProjectionRanks.get(this.piece.color))?
      2:regularProjectionMap.get(this.piece.role, this.piece.color);
  }

  get d2Captures(): Array<D1> {
    return [...d2CapturesMap.get(this.piece.role, this.piece.color)];
  }
  
  get d2(): Array<D1> {
    return [...d2Map.get(this.piece.role, this.piece.color)];
  }

  get capturePaths(): Array<Array<Pos>> {
    return this.d2Captures.map(d1 => {
      let path = this.pos
        .route(d1)
        .projection(this.projection);
      return path;
    });
  }
  
  get paths(): Array<Array<Pos>> {
    return this.d2.map(d1 => {
      let path = this.pos
        .route(d1)
        .projection(this.projection);
      return path;
    });
  }
  
  constructor(piece: Piece,
              pos: Pos) {
    super(AnyVal.combine(piece.key,
                         pos.key));

    this.piece = piece;
    this.pos = pos;
  }

  is(role: Role): boolean {
    return this.piece.role.equals(role);
  }
  
}
