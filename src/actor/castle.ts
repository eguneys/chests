import { Role } from '../role';
import { Board } from '../board';
import { Piese } from '../piese';
import { Piece } from '../piece';
import { Pos } from '../pos';
import { Castles } from '../san';

export class CastlesOn {

  static make = (piese: Piese,
                 origRook: Piese,
                 castles: Castles) => new CastlesOn(piese, origRook, castles);

  origRook: Piese
  piese: Piese
  castles: Castles

  get origKingPos(): Pos {
    return this.piese.pos;
  }

  get destKingPos(): Pos {
    return this.origKingPos.cfile(this.castles.king);
  }

  get origRookPos(): Pos {
    return this.origRook.pos;
  }

  get destRookPos(): Pos {
    return this.origRookPos.cfile(this.castles.rook);
  }
  
  
  constructor(piese: Piese,
              origRook: Piese,
              castles: Castles) {
    this.piese = piese;
    this.origRook = origRook;
    this.castles = castles;
  }
  
}
