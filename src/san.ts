import AnyVal from './anyval';
import { Pos } from './pos';
import { Role } from './role';
import { D0 } from './disp';
import { File, Rank } from './dir';

export function sanOrCastles(sanOrC: string): Maybe<SanOrCastles> {

  if (Castles.shortNotations.includes(sanOrC)) {
    return Castles.short;
  } else if (Castles.longNotations.includes(sanOrC)) {
    return Castles.long;
  }
  return san(sanOrC);
}

export function san(san: string): Maybe<San> {

  let RE = /(N|B|R|Q|K|)([a-h]?)([1-8]?)(x?)([a-h][0-9])(=?[NBRQ]?)(\+?)(\#?)/;

  let m = san.match(RE);

  if (m) {
    let [_, roleS, fileS, rankS, captureS, toS, promotionS, checkS, mateS] = m;

    promotionS = promotionS.replace('=', '');

    let mate = mateS !== '',
    check = checkS !== '',
    capture = captureS !== '',
    rank = rankS !== '' ? Rank.mkey(rankS) : undefined,
    file = fileS !== '' ? File.mkey(fileS) : undefined,
    role = roleS !== '' ? Role.mkey(roleS) || Role.pawn : Role.pawn,
    promotion = promotionS !== '' ? Role.mkey(promotionS): undefined,
    to = Pos.mkey(toS);

    if (to) {
      return new San(san,
                     to,
                     role,
                     file,
                     rank,
                     promotion,
                     capture,
                     check,
                     mate);
    }
    
  }  
  
}

export type SanOrCastles = San | Castles

export class San extends AnyVal {

  to: Pos
  role: Role
  file?: File
  rank?: Rank
  promotion?: Role
  capture?: boolean
  check?: boolean
  mate?: boolean

  constructor(key: string,
              to: Pos,
              role: Role,
              file?: File,
              rank?: Rank,
              promotion?: Role,
              capture?: boolean,
              check?: boolean,
              mate?: boolean) {
    super(key);
    
    this.to = to;
    this.role = role;
    this.file = file;
    this.rank = rank;
    this.promotion = promotion;
    this.capture = capture;
    this.check = check;
    this.mate = mate;
  }
  
}

export class Castles extends AnyVal {

  static shortNotations = ['O-O', 'o-o', '0-0'];
  static longNotations = ['O-O-O', 'o-o-o', '0-0-0'];

  static long: Castles = new Castles('O-O-O', File.c, File.d, D0.left);
  static short: Castles = new Castles('O-O', File.g, File.f, D0.right);

  static all: Array<Castles> = [Castles.long, Castles.short];
  
  king: File
  rook: File
  trip: D0

  constructor(key: string, king: File, rook: File, trip: D0) {
    super(key);
    this.king = king;
    this.rook = rook;
    this.trip = trip;
  }
  
}


export function isCastles(_: any): _ is Castles {
  return (_ as Castles).king !== undefined;
}
