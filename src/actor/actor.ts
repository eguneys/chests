import { Situation } from '../situation';
import { Castles } from '../san';
import { Move, isMove } from '../move';
import { Role } from '../role';
import { Piese } from '../piese';
import { Piece } from '../piece';
import { Board } from '../board';
import { Pos } from '../pos';
import { Color } from '../role';
import { D1, D2 } from '../disp';
import { ColorMap } from '../cmap';
import { Pressure } from './pressure';
import { PawnPush } from './pawnpush';
import { CastlesOn } from './castle';

export class Actor {
  
  static make = (piese: Piese, board: Board): Actor => new Actor(piese, board);
  
  kind: string = 'actor';

  get pos(): Pos {
    return this.piese.pos;
  }
  
  get piece(): Piece {
    return this.piese.piece;
  }
  
  get color(): Color {
    return this.piece.color;
  }

  get situation(): Situation {
    return Situation.make(this.board, this.color);
  }

  get isPawn(): boolean {
    return this.piese.piece.is(Role.pawn);
  }

  get pawnPushes(): Array<PawnPush> {
    if (!this.isPawn) {
      return [];
    }

    return this.piese.paths.flatMap(paths => {
      let blocks: Array<Piese> = [];
      
      return paths.reduce<Array<PawnPush>>((res, to) => {

        let on = this.board.get(to);

        if (on) {
          blocks.push(on);
        }      

        res.push(PawnPush.make(this.piese,
                               to,
                               blocks.slice(0)));
        return res;
      }, []);
    });
  }
  
  get pressures(): Array<Pressure> {
    return this.piese.capturePaths.flatMap(capturePaths => {
      let blocks: Array<Piese> = [],
      free: Array<Pos> = [];
      
      return capturePaths.reduce<Array<Pressure>>((res, to) => {

        let on = this.board.get(to);

        res.push(Pressure.make(this.piese,
                               to,
                               on,
                               free.slice(0),
                               blocks.slice(0)));
        
        if (on) {
          blocks.push(on);
        } else {
          free.push(to);
        }
        return res;
      }, []);
    });
  }

  get castles(): Array<CastlesOn> {
    if (!this.piese.is(Role.king)) {
      return [];
    }

    let origKingPos = this.piese.pos;
    
    return Castles.all.flatMap(castles => {
      let koor = origKingPos.route(castles.trip.rank());
      let origRook = this.board
        .onRoute(koor)
        .filter(_ => _.piece.is(Role.rook))[0];

      if (origRook) {
        return [CastlesOn.make(this.piese,
                       origRook,
                       castles)]
      }
      return [];
    });
  }

  readonly piese: Piese
  readonly board: Board

  constructor(piese: Piese,
              board: Board) {
    this.piese = piese;
    this.board = board;
  }
  
}

export function isActor(_: any): _ is Actor {
  return _ && typeof (_ as Actor).kind === 'string';
}
