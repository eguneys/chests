import { Color, Role } from './role';

export class ColorMap<V> {

  static zero: ColorMap<Color> = new ColorMap<Color>(Color.white,
                                                     Color.black);
  
  static make = <V>(op: (color: Color) => V): ColorMap<V> => {
    return ColorMap.zero.map(op);
  }
  
  white: V
  black: V
  
  constructor(white: V, black: V) {
    this.white = white;
    this.black = black;
  }

  get(c: Color): V {
    return c.white?this.white:this.black;
  }

  flatMap<B>(op: (v: V, c?: Color) => ColorMap<B>): ColorMap<B> {
    return new ColorMap(op(this.white, Color.white).get(Color.white),
                        op(this.black, Color.black).get(Color.black));
  }
  
  map<B>(op: (v: V, c?: Color) => B): ColorMap<B> {
    return new ColorMap(op(this.white, Color.white),
                        op(this.black, Color.black));
  }
  
}

export class RoleMap<V> {

  knight: V
  bishop: V
  queen: V
  king: V
  rook: V
  wpawn: V
  bpawn: V

  constructor(queen: V,
              knight: V,
              rook: V,
              bishop: V,
              king: V,
              wpawn: V,
              bpawn: V) {
    this.queen = queen;
    this.knight = knight;
    this.rook = rook;
    this.bishop = bishop;
    this.king = king;
    this.wpawn = wpawn;
    this.bpawn = bpawn;
  }

  get(r: Role, c?: Color) {
    if (r.equals(Role.queen)) {
      return this.queen;
    } else if (r.equals(Role.knight)) {
      return this.knight;
    } else if (r.equals(Role.rook)) {
      return this.rook;
    } else if (r.equals(Role.bishop)) {
      return this.bishop;
    } else if (r.equals(Role.king)) {
      return this.king;
    } else {
      if (c?.white) {
        return this.wpawn;
      } else {
        return this.bpawn;
      }
    }
  }
}
