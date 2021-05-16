import { Maybe } from './types';
import AnyVal from './anyval';
import MapV from './mapv';
import { Piese } from './piese';
import { Piece } from './piece';
import { Pos } from './pos';
import { Color } from './role';
import { Situation } from './situation';
import { Route } from './route';
import { ColorMap } from './cmap';

export class Board extends AnyVal {

  static make = (apieses: Array<Piese>) => {
    let pieses = MapV.make(apieses.map(piese => [
      piese.pos,
      piese
    ]));
    return new Board(pieses);
  }

  readonly pieses: MapV<Pos, Piese>

  get values() {
    return [...this.pieses.values()];
  }

  get fen(): string {
    return [0, 1, 2, 3, 4, 5, 6, 7].map(i => {
      let spaces = 0;
      let rowS = '';
      Pos.all.slice(i*8, i*8+8).forEach(pos => {
        let piese = this.get(pos);
        if (!piese) {
          spaces++;
        } else {
          if (spaces > 0) {
            rowS += spaces;
            spaces = 0;
          }
          rowS += piese.piece.key;
        }
      });
      if (spaces > 0) {
        rowS += spaces;
        spaces = 0;
      }
      return rowS;
    }).join('/');
  }

  get piesesByColor(): ColorMap<Array<Piese>> {
    return Piece.all.map(_ => _.flatMap(_ => this.getPiece(_)))
  }
  
  get kingPiese(): ColorMap<Maybe<Piese>> {
    return Piece.kings.map(_ => this.getPiece(_)[0]);
  }
  
  constructor(pieses: MapV<Pos, Piese>) {
    super(AnyVal.reduce([...pieses.values()]
                          .map(_ => _.key), ''));


    this.pieses = pieses
  }

  castle(origKing: Pos,
         destKing: Pos,
         origRook: Pos,
         destRook: Pos) {
    let kingse = this.pieses.get(origKing),
    rookse = this.pieses.get(origRook);
    if (kingse && rookse) {
      let pieses = this.pieses.copy;
      pieses.delete(origKing);
      pieses.delete(origRook);
      pieses.set(destKing, kingse.piece.on(destKing));
      pieses.set(destRook, rookse.piece.on(destRook));

      return new Board(pieses);
    }
  }

  capture(pos: Pos, to: Pos) {
    return this.move(pos, to);
  }
  
  move(pos: Pos, to: Pos) {
    let atse = this.pieses.get(pos);
    if (atse) {
      let pieses = this.pieses.copy;
      pieses.delete(pos);
      pieses.set(to, atse.piece.on(to));
      return new Board(pieses);
    }
  }

  onRoute(route: Route) {
    return this.values.filter(_ =>
      route.on(_.pos));
  }

  getPiece(piece: Piece) {
    return this.values.filter(_ =>
      _.piece.equals(piece));
  }
  
  get(pos: Pos) {
    return this.pieses.get(pos);
  }

  situation(color: Color) {
    return Situation.make(this, color);
  }
  
}
