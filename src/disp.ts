import AnyVal from './anyval';

export const d0s = [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7] as const;

export type D0Key = typeof d0s[number];

export class D0 extends AnyVal {

  static make = (index: number) => new D0(index);

  static zero = D0.make(0);
  static up = D0.make(1);
  static right = D0.make(1);
  static down = D0.make(-1);
  static left = D0.make(-1);

  static up2 = D0.make(2);
  static up3 = D0.make(3);
  static up4 = D0.make(4);
  static up5 = D0.make(5);
  static up6 = D0.make(6);
  static up7 = D0.make(7);
  static down2 = D0.make(-2);
  static down3 = D0.make(-3);
  static down4 = D0.make(-4);
  static down5 = D0.make(-5);
  static down6 = D0.make(-6);
  static down7 = D0.make(-7);
  static left2 = D0.make(-2);
  static left3 = D0.make(-3);
  static left4 = D0.make(-4);
  static left5 = D0.make(-5);
  static left6 = D0.make(-6);
  static left7 = D0.make(-7);
  static right2 = D0.make(2);
  static right3 = D0.make(3);
  static right4 = D0.make(4);
  static right5 = D0.make(5);
  static right6 = D0.make(6);
  static right7 = D0.make(7);
  
  static pawnWhite = D0.up
  static pawnBlack = D0.down;
  

  static all: Array<D0> = [
    D0.zero,
    D0.up,
    D0.up2,
    D0.up3,
    D0.up4,
    D0.up5,
    D0.up6,
    D0.up7,
    D0.down,
    D0.down2,
    D0.down3,
    D0.down4,
    D0.down5,
    D0.down6,
    D0.down7,
  ];

  static key = (key: D0Key): D0 => D0.allByKey.get(key)!;

  static allByKey: Map<D0Key, D0> = new Map<D0Key, D0>(D0.all.map(d0 => [
    d0.key as D0Key, d0
  ]));

  get index(): number {
    return this.key as number;
  }
  
  constructor(index: number) {
    super(index);
  }

  file(file: D0 = D0.zero) {
    return D1.make(file, this);
  }
  
  rank(rank: D0 = D0.zero) {
    return D1.make(this, rank);
  }
  
}

export function isD0Key(char: number): char is D0Key {
  return d0s.includes(char as D0Key);
}

export class D1 extends AnyVal {

  static make = (dfile: D0, drank: D0) => new D1(dfile, drank);

  static zero = D1.make(D0.zero, D0.zero);
  static up = D1.make(D0.zero, D0.up);
  static right = D1.make(D0.right, D0.zero);
  static down = D1.make(D0.zero, D0.down);
  static left = D1.make(D0.left, D0.zero);

  static up2 = D1.make(D0.zero, D0.up2);
  static down2 = D1.make(D0.zero, D0.down2);

  static downLeft = D1.make(D0.left, D0.down);
  static downRight = D1.make(D0.right, D0.down);
  static upLeft = D1.make(D0.left, D0.up);
  static upRight = D1.make(D0.right, D0.up);

  static down2Left = D1.make(D0.left, D0.down2);
  static down2Right = D1.make(D0.right, D0.down2);
  static up2Left = D1.make(D0.left, D0.up2);
  static up2Right = D1.make(D0.right, D0.up2);
  static downLeft2 = D1.make(D0.left2, D0.down);
  static downRight2 = D1.make(D0.right2, D0.down);
  static upLeft2 = D1.make(D0.left2, D0.up);
  static upRight2 = D1.make(D0.right2, D0.up);


  static pawnWhite = D0.pawnWhite.file();
  static pawnBlack = D0.pawnBlack.file();
  
  readonly dfile: D0;
  readonly drank: D0;
  
  constructor(dfile: D0, drank: D0) {
    super(AnyVal.combine(dfile.key, drank.key));
    this.dfile = dfile;
    this.drank = drank;
  }
}


export class D2 {

  static Knight: Set<D1> = new Set([
    D1.up2Left,
    D1.up2Right,
    D1.down2Left,
    D1.down2Right,
    D1.upLeft2,
    D1.upRight2,
    D1.downLeft2,
    D1.downRight2
  ])

  static Rook: Set<D1> = new Set([
    D1.up,
    D1.down,
    D1.left,
    D1.right
  ]);

  static Bishop: Set<D1> = new Set([
    D1.upLeft,
    D1.upRight,
    D1.downLeft,
    D1.downRight
  ]);

  static Queen: Set<D1> = new Set([
    ...D2.Bishop,
    ...D2.Rook
  ]);

  static King: Set<D1> = D2.Queen

  static WhitePawn = new Set([
    D1.up
  ]);

  static WhitePawnCapture = new Set([
    D1.upLeft,
    D1.upRight
  ]);

  static BlackPawn = new Set([
    D1.down
  ]);

  static BlackPawnCapture = new Set([
    D1.downLeft,
    D1.downRight
  ]);
  
}
