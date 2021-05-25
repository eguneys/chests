import { Pos } from './pos';
import { Role } from './role';
import { File } from './dir';
import { UciOrCastles } from './uci';
import { Castles, isCastles } from './san';

export type UciCharPair = string

export function ab(a: string, b: string): UciCharPair {
  return a + b;
}

export function uci(uOrc: UciOrCastles): UciCharPair {
  if (isCastles(uOrc)) {
    return uOrc.key as string;
  }
  let { orig, dest, promotion } = uOrc;
  if (!promotion) {
    return ab(implementation.toChar(orig), implementation.toChar(dest));
  } else {
    return ab(implementation.toChar(orig), implementation.toCharP(dest.file, promotion));
  }
}


export class implementation {

  static voidChar = '!';
  static charShift = '#'.charCodeAt(0);

  static hashPos = (pos: Pos): number => {
    return pos.file.index * 8 + pos.rank.index;
  }

  static hashFileRole = (file: File, role: Role): number => {
    return file.index + role.keyr.charCodeAt(0);
  }
  
  static pos2CharMap: Map<number, string> = new Map(
    Pos.all.map(pos =>
      [implementation.hashPos(pos),
       String.fromCharCode(implementation.hashPos(pos) + implementation.charShift)])
  );

  static proCharMap: Map<number, string> = new Map(
    Role.promotables.flatMap((role, i) =>
      File.all.map(file =>
        [implementation.hashFileRole(file, role),
         String.fromCharCode(implementation.charShift + implementation.pos2CharMap.size + i * 8 + file.index)]))
  );

  static toChar = (pos: Pos) => {
    return implementation.pos2CharMap.get(implementation.hashPos(pos)) || implementation.voidChar;
  }

  static toCharP = (file: File, prom: Role) => {
    return implementation.proCharMap.get(implementation.hashFileRole(file, prom)) || implementation.voidChar;
  }

}
