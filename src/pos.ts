import AnyVal from './anyval';
import { File, Rank, FileKey, RankKey } from './dir';
import { D1 } from './disp';
import { Route } from './route';

export const positions = [
  'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8',
  'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8',
  'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8',
  'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8',
  'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8',
  'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8',
  'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'];

export type PosKey = typeof positions[number];

export class Pos extends AnyVal {

  static make = (file: File, rank: Rank): Pos => new Pos(file, rank);

  static a1: Pos = Pos.make(File.a, Rank.first)
  static a2: Pos = Pos.make(File.a, Rank.second)
  static a3: Pos = Pos.make(File.a, Rank.third)
  static a4: Pos = Pos.make(File.a, Rank.fourth)
  static a5: Pos = Pos.make(File.a, Rank.fifth)
  static a6: Pos = Pos.make(File.a, Rank.sixth)
  static a7: Pos = Pos.make(File.a, Rank.seventh)
  static a8: Pos = Pos.make(File.a, Rank.eight)
  static b1: Pos = Pos.make(File.b, Rank.first)
  static b2: Pos = Pos.make(File.b, Rank.second)
  static b3: Pos = Pos.make(File.b, Rank.third)
  static b4: Pos = Pos.make(File.b, Rank.fourth)
  static b5: Pos = Pos.make(File.b, Rank.fifth)
  static b6: Pos = Pos.make(File.b, Rank.sixth)
  static b7: Pos = Pos.make(File.b, Rank.seventh)
  static b8: Pos = Pos.make(File.b, Rank.eight)
  static c1: Pos = Pos.make(File.c, Rank.first)
  static c2: Pos = Pos.make(File.c, Rank.second)
  static c3: Pos = Pos.make(File.c, Rank.third)
  static c4: Pos = Pos.make(File.c, Rank.fourth)
  static c5: Pos = Pos.make(File.c, Rank.fifth)
  static c6: Pos = Pos.make(File.c, Rank.sixth)
  static c7: Pos = Pos.make(File.c, Rank.seventh)
  static c8: Pos = Pos.make(File.c, Rank.eight)
  static d1: Pos = Pos.make(File.d, Rank.first)
  static d2: Pos = Pos.make(File.d, Rank.second)
  static d3: Pos = Pos.make(File.d, Rank.third)
  static d4: Pos = Pos.make(File.d, Rank.fourth)
  static d5: Pos = Pos.make(File.d, Rank.fifth)
  static d6: Pos = Pos.make(File.d, Rank.sixth)
  static d7: Pos = Pos.make(File.d, Rank.seventh)
  static d8: Pos = Pos.make(File.d, Rank.eight)
  static e1: Pos = Pos.make(File.e, Rank.first)
  static e2: Pos = Pos.make(File.e, Rank.second)
  static e3: Pos = Pos.make(File.e, Rank.third)
  static e4: Pos = Pos.make(File.e, Rank.fourth)
  static e5: Pos = Pos.make(File.e, Rank.fifth)
  static e6: Pos = Pos.make(File.e, Rank.sixth)
  static e7: Pos = Pos.make(File.e, Rank.seventh)
  static e8: Pos = Pos.make(File.e, Rank.eight)
  static f1: Pos = Pos.make(File.f, Rank.first)
  static f2: Pos = Pos.make(File.f, Rank.second)
  static f3: Pos = Pos.make(File.f, Rank.third)
  static f4: Pos = Pos.make(File.f, Rank.fourth)
  static f5: Pos = Pos.make(File.f, Rank.fifth)
  static f6: Pos = Pos.make(File.f, Rank.sixth)
  static f7: Pos = Pos.make(File.f, Rank.seventh)
  static f8: Pos = Pos.make(File.f, Rank.eight)
  static g1: Pos = Pos.make(File.g, Rank.first)
  static g2: Pos = Pos.make(File.g, Rank.second)
  static g3: Pos = Pos.make(File.g, Rank.third)
  static g4: Pos = Pos.make(File.g, Rank.fourth)
  static g5: Pos = Pos.make(File.g, Rank.fifth)
  static g6: Pos = Pos.make(File.g, Rank.sixth)
  static g7: Pos = Pos.make(File.g, Rank.seventh)
  static g8: Pos = Pos.make(File.g, Rank.eight)
  static h1: Pos = Pos.make(File.h, Rank.first)
  static h2: Pos = Pos.make(File.h, Rank.second)
  static h3: Pos = Pos.make(File.h, Rank.third)
  static h4: Pos = Pos.make(File.h, Rank.fourth)
  static h5: Pos = Pos.make(File.h, Rank.fifth)
  static h6: Pos = Pos.make(File.h, Rank.sixth)
  static h7: Pos = Pos.make(File.h, Rank.seventh)
  static h8: Pos = Pos.make(File.h, Rank.eight)


  static all: Array<Pos> = [Pos.a8, Pos.b8, Pos.c8, Pos.d8, Pos.e8, Pos.f8, Pos.g8, Pos.h8,
                            Pos.a7, Pos.b7, Pos.c7, Pos.d7, Pos.e7, Pos.f7, Pos.g7, Pos.h7,
                            Pos.a6, Pos.b6, Pos.c6, Pos.d6, Pos.e6, Pos.f6, Pos.g6, Pos.h6,
                            Pos.a5, Pos.b5, Pos.c5, Pos.d5, Pos.e5, Pos.f5, Pos.g5, Pos.h5,
                            Pos.a4, Pos.b4, Pos.c4, Pos.d4, Pos.e4, Pos.f4, Pos.g4, Pos.h4,
                            Pos.a3, Pos.b3, Pos.c3, Pos.d3, Pos.e3, Pos.f3, Pos.g3, Pos.h3,
                            Pos.a2, Pos.b2, Pos.c2, Pos.d2, Pos.e2, Pos.f2, Pos.g2, Pos.h2,
                            Pos.a1, Pos.b1, Pos.c1, Pos.d1, Pos.e1, Pos.f1, Pos.g1, Pos.h1];



  static allByKey: Map<PosKey, Pos> = new Map<PosKey, Pos>(Pos.all.map(_ => [
    _.key as PosKey, _
  ]));

  static mkey = (key: string): Maybe<Pos> => Pos.allByKey.get(key as PosKey);

  static key = (key: PosKey): Pos => Pos.mkey(key)!;
  
  readonly file: File
  readonly rank: Rank
  
  constructor(file: File, rank: Rank) {
    super(AnyVal.combine(file.key, rank.key));

    this.file = file;
    this.rank = rank;
  }

  route(d1: D1): Route {
    return Route.make(this, d1);
  }

  d1(d1: D1): Maybe<Pos> {
    let pfile = this.file.d0(d1.dfile),
    prank = this.rank.d0(d1.drank);

    if (pfile && prank) {
      return Pos.make(pfile, prank);
    }
  }

  cfile(file: File): Pos {
    return Pos.make(file, this.rank);
  }
}
