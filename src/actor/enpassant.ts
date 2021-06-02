import { Maybe } from '../types';
import { Role } from '../role';
import { Piese } from '../piese';
import { Piece } from '../piece';
import { Pos } from '../pos';
import { pawnEnPassantRanks } from '../misc';


export class EnPassant {

  static make = (piese: Piese,
                 to: Pos,
                 capture: Maybe<Piese>) =>
    new EnPassant(piese,
                  to,
                  capture);

  get pos(): Pos {
    return this.piese.pos;
  }

  get direct(): boolean {
    return !!this.capture;
  }
  
  constructor(readonly piese: Piese,
              readonly to: Pos,
              readonly capture: Maybe<Piese>) {}
  
}
