import AnyVal from './anyval';
import { Pos } from './pos';
import { D0 } from './disp';

export const directions = [1, 2, 3, 4, 5, 6, 7, 8] as const;
export const rdirections = [8, 7, 6, 5, 4, 3, 2, 1] as const;
export const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
export const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'] as const;
  
export type FileKey = typeof files[number];
export type RankKey = typeof ranks[number];

export class File extends AnyVal {

  static make = (index: number): File => new File(index);

  static a: File = File.make(1)
  static b: File = File.make(2)
  static c: File = File.make(3)
  static d: File = File.make(4)
  static e: File = File.make(5)
  static f: File = File.make(6)
  static g: File = File.make(7)
  static h: File = File.make(8)

  static all: Array<File> = [
    File.a,
    File.b,
    File.c,
    File.d,
    File.e,
    File.f,
    File.g,
    File.h,
  ];

  static mkey = (key: string): Maybe<File> => File.allByKey.get(key as FileKey);
  
  static key = (key: FileKey): File => File.mkey(key)!;

  static allByKey: Map<FileKey, File> = new Map<FileKey, File>(File.all.map(_ =>
    [_.key as FileKey, _]));

  static allByIndex: Map<number, File> = new Map<number, File>(File.all.map(_ =>
    [_.index, _]));

  index: number;

  get left(): Maybe<File> {
    return this.d0(D0.left);
  }

  get right(): Maybe<File> {
    return this.d0(D0.right);
  }  
  
  constructor(index: number) {
    super(files[index-1]);
    this.index = index;
  }

  rank(rank: Rank): Pos {
    return Pos.make(this, rank);
  }

  d0(d0: D0): Maybe<File> {
    return File.allByIndex.get(d0.index + this.index);
  }  
}

export class Rank extends AnyVal {

  static make = (index: number): Rank => new Rank(index);
  
  static first: Rank = Rank.make(1)
  static second: Rank = Rank.make(2)
  static third: Rank = Rank.make(3)
  static fourth: Rank = Rank.make(4)
  static fifth: Rank = Rank.make(5)
  static sixth: Rank = Rank.make(6)
  static seventh: Rank = Rank.make(7)
  static eight: Rank = Rank.make(8)

  static all: Array<Rank> = [
    Rank.first,
    Rank.second,
    Rank.third,
    Rank.fourth,
    Rank.fifth,
    Rank.sixth,
    Rank.seventh,
    Rank.eight
  ];

  static mkey = (key: string): Maybe<Rank> => Rank.allByKey.get(key as RankKey);
  
  static key = (key: RankKey): Rank => Rank.mkey(key)!;

  static allByKey: Map<RankKey, Rank> = new Map<RankKey, Rank>(Rank.all.map(rank => [
    rank.key as RankKey, rank
  ]));

  static allByIndex: Map<number, Rank> = new Map<number, Rank>(Rank.all.map(_ =>
    [_.index, _]));

  index: number

  get down(): Maybe<Rank> {
    return this.d0(D0.down);
  }

  get up(): Maybe<Rank> {
    return this.d0(D0.up);
  }  
  
  constructor(index: number) {
    super(ranks[index - 1]);
    this.index = index;
  }

  file(file: File): Pos {
    return Pos.make(file, this);
  }

  d0(d0: D0): Maybe<Rank> {
    return Rank.allByIndex.get(d0.index + this.index);
  }
  
}
