import { Maybe } from './types';
import AnyVal from './anyval';
import { Piece, PieceKey } from './piece';

export const roles = ['q', 'n', 'r', 'b', 'p', 'k'] as const;
export const promotables = ['q', 'n', 'r', 'b'] as const;

export type RoleKey = typeof roles[number];

export class Role extends AnyVal {

  static make = (key: RoleKey): Role => new Role(key);
  
  static long = {
    'b': 'bishop',
    'n': 'knight',
    'r': 'rook',
    'k': 'king',
    'q': 'queen',
    'p': 'pawn'
  };

  static queen: Role = Role.make('q')
  static knight: Role = Role.make('n')
  static rook: Role = Role.make('r')
  static bishop: Role = Role.make('b')
  static king: Role = Role.make('k')
  static pawn: Role = Role.make('p')
  
  
  static all: Array<Role> = [
    Role.queen,
    Role.knight,
    Role.rook,
    Role.bishop,
    Role.king,
    Role.pawn
  ];

  static promotables: Array<Role> = [
    Role.queen,
    Role.knight,
    Role.rook,
    Role.bishop
  ];

  static mkey = (key: string): Maybe<Role> => Role.allByKey.get(key.toLowerCase() as RoleKey);
  
  static key = (key: RoleKey): Role => Role.mkey(key)!;

  static allByKey: Map<RoleKey, Role> = new Map<RoleKey, Role>(Role.all.map(_ =>
    [_.key as RoleKey, _]));

  
  get long(): string {
    return Role.long[this.keyr];
  }

  get keyr(): RoleKey {
    return this.key as RoleKey;
  }

  get whiteS(): string {
    return this.keyr.toUpperCase();
  }

  get blackS(): string {
    return this.keyr;
  }

  get promotionS(): string {
    return `=${this.whiteS}`;
  }
  
  constructor(key: RoleKey) {
    super(key);
  }

  color(color: Color): Piece {
    return color.role(this);
  }
  
}

export const colors = ['w', 'b'] as const;
export type ColorKey = typeof colors[number];

export class Color extends AnyVal {
  
  static long = {
    'w': 'white',
    'b': 'black'
  };
  
  static key = (key: ColorKey): Color => new Color(key);

  static boole = (white: boolean): Color => Color.key(white?'w':'b');

  static black: Color = Color.key('b');
  static white: Color = Color.key('w');

  get long(): string {
    return Color.long[this.rkey];
  }

  get rkey(): ColorKey {
    return this.key as ColorKey;
  }
  
  get white(): boolean {
    return this.key === 'w';
  }

  get black(): boolean {
    return !this.white;
  }

  get opposite(): Color {
    return this.fold(Color.black,
                     Color.white);
  }

  constructor(key: ColorKey) {
    super(key);
  }

  fold<A>(white: A, black: A): A {
    return this.white?white:black;
  }

  role(role: Role) {
    let key =
      this.fold((role.key as string).toUpperCase(),
                role.key) as PieceKey;

    return Piece.key(key);
  }
}

export function isColorKey(_: string): _ is ColorKey {
  return colors.includes(_ as ColorKey);
}
