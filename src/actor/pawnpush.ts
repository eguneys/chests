import { Role } from '../role';
import { Piese } from '../piese';
import { Piece } from '../piece';
import { Pos } from '../pos';
import { pawn2ProjectionRanks } from '../misc';


export class PawnPush {

  static make = (piese: Piese,
                 to: Pos,
                 blocks: Array<Piese>) =>
    new PawnPush(piese,
                 to,
                 blocks);

  piese: Piese
  to: Pos
  blocks: Array<Piese>

  get pos(): Pos {
    return this.piese.pos;
  }
  
  get direct(): boolean {
    return this.blocks.length === 0;
  }

  get double(): boolean {
    return this.pos.rank.equals(pawn2ProjectionRanks.get(this.piese.color))
  }
  
  constructor(piese: Piese,
              to: Pos,
              blocks: Array<Piese>) {
    this.piese = piese;
    this.to = to;
    this.blocks = blocks;
  }
  
}
