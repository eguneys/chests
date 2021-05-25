import { Maybe } from './types';
import AnyVal from './anyval';
import { SanOrCastles } from './san';
import { Pos } from './pos';
import { Role } from './role';
import { Castles } from './san';

export function uciOrCastles(uciOrC: string) {

  if (Castles.shortNotations.includes(uciOrC)) {
    return Castles.short;
  } else if (Castles.longNotations.includes(uciOrC)) {
    return Castles.long;
  }
  return uci(uciOrC);
  
}

export function uci(uci: string): Maybe<Uci> {

  let RE = /([a-z][1-8])([a-z][1-8])(=?[NBRQ]?)/;

  let m = uci.match(RE);

  if (m) {
    let [_, origS, destS, promotionS] = m;

    promotionS = promotionS.replace('=', '');

    let orig = Pos.mkey(origS),
    dest = Pos.mkey(destS),
    promotion = promotionS !== '' ? Role.mkey(promotionS) : undefined;

    if (orig && dest) {
      return new Uci(uci, orig, dest, promotion);
    }
    
  }    
  
}

export type UciOrCastles = Uci | Castles

export type UciWithSan = {
  uci: UciOrCastles,
  san: SanOrCastles
};

export class Uci extends AnyVal {

  static withSan = (uci: UciOrCastles, san: SanOrCastles): UciWithSan => ({
    uci,
    san
  });
  
  orig: Pos
  dest: Pos
  promotion?: Role

  get uci(): string {
    return this.orig.key as string + this.dest.key as string + (this.promotion?.promotionS||'');
  }
  
  constructor(key: string,
              orig: Pos,
              dest: Pos,
              promotion?: Role) {
    super(key);

    this.orig = orig;
    this.dest = dest;
    this.promotion = promotion;    
  }

}
