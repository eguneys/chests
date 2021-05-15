import { Role } from '../role';
import { Piese } from '../piese';
import { Piece } from '../piece';
import { Pos } from '../pos';

export class Pressure {

  static make = (piese: Piese,
                 to: Pos,
                 on: Maybe<Piese>,
                 free: Array<Pos>,
                 blocks: Array<Piese>) => new Pressure(piese,
                                                       to,
                                                       on,
                                                       free,
                                                       blocks);

  get pos(): Pos {
    return this.piese.pos;
  }
  
  get checks(): boolean {
    return this.captures &&
      !!this.on &&
      this.on.piece.is(Role.king);
  }

  get captures(): boolean {
    return this.attack && this.direct;
  }
  
  get attack(): boolean {
    return this.on !== undefined &&
      !this.piese.color.equals(this.on.color);
  }

  get defend(): boolean {
    return this.on !== undefined &&
      this.piese.color.equals(this.on.color);
  }
  
  get direct(): boolean {
    return this.blocks.length === 0 && !this.defend;
  }

  get emptyPawnCapture(): boolean {
    return !this.captures && this.piese.is(Role.pawn);
  }
  
  piese: Piese
  to: Pos
  on: Maybe<Piese>
  free: Array<Pos>
  blocks: Array<Piese>
  
  constructor(piese: Piese,
              to: Pos,
              on: Maybe<Piese>,
              free: Array<Pos>,
              blocks: Array<Piese>) {
    this.piese = piese;
    this.to = to;
    this.on = on;
    this.free = free;
    this.blocks = blocks;
  }
                
}
