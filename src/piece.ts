import AnyVal from './anyval';
import { Color,  Role, RoleKey } from './role';
import { Piese } from './piese';
import { Pos } from './pos';
import { ColorMap } from './cmap';

export const pieces = ['q', 'n', 'r', 'b', 'p', 'k',
                       'Q', 'N', 'R', 'B', 'P', 'K'] as const;


export type PieceKey = typeof pieces[number];

export function isPieceKey(key: string): key is PieceKey {
  return pieces.includes(key as PieceKey);
}

export class Piece extends AnyVal {

  static key = (key: PieceKey): Piece => new Piece(key);

  static kings = new ColorMap<Piece>(Piece.key('K'),
                                     Piece.key('k'));

  static all = ColorMap.make(color =>
    Role.all
      .map(role => role.color(color)));
  
  readonly role: Role
  readonly color: Color

  get sanS(): string {
    return this.is(Role.pawn)?'':this.role.whiteS;
    //return this.color.white?this.role.whiteS:this.role.blackS;
  }
  
  constructor(key: PieceKey) {
    super(key);

    let roleKey = key.toLowerCase() as RoleKey;
    this.role = Role.key(roleKey);
    this.color = Color.boole(roleKey !== key);
  }

  on(pos: Pos): Piese {
    return Piese.make(this, pos);
  }

  is(role: Role): boolean {
    return this.role.equals(role);
  }
  
}
