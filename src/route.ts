import AnyVal from './anyval';
import { Pos } from './pos';
import { D1 } from './disp';

export class Route extends AnyVal {

  static make = (orig: Pos, dir: D1) =>
    new Route(orig, dir);
  
  readonly orig: Pos
  readonly dir: D1

  get path(): Array<Pos> {
    let res = [];
    let _: Maybe<Pos> = this.orig;
    while (true) {
      _ = _.d1(this.dir);
      if (_) {
        res.push(_);
      } else {
        break;
      }
    }
    return res;
  }
  
  constructor(orig: Pos,
              dir: D1) {
    super(AnyVal.combine(orig.key, dir.key));

    this.orig = orig;
    this.dir = dir;
  }

  on(pos: Pos) {
    return this.path
      .filter(_ => _.equals(pos))
      .length > 0;
  }

  projection(projection: number) {
    return this.path.slice(0, projection);
  }
}
