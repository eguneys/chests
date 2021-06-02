import { RoleMap, ColorMap } from './cmap';
import { D1, D2 } from './disp';
import { Rank } from './dir';

export const d2Map = new RoleMap<Set<D1>>(
  D2.Queen,
  D2.Knight,
  D2.Rook,
  D2.Bishop,
  D2.King,
  D2.WhitePawn,
  D2.BlackPawn
);

export const d2CapturesMap = new RoleMap<Set<D1>>(
  D2.Queen,
  D2.Knight,
  D2.Rook,
  D2.Bishop,
  D2.King,
  D2.WhitePawnCapture,
  D2.BlackPawnCapture
);


export const regularProjectionMap = new RoleMap<number>(
  7,
  1,
  7,
  7,
  1,
  1,
  1
);

export const pawnEnPassantRanks = new ColorMap<Rank>(
  Rank.fifth,
  Rank.fourth
);

export const pawn2ProjectionRanks = new ColorMap<Rank>(
  Rank.second,
  Rank.seventh
);

export const pawnPromoteRanks = new ColorMap<Rank>(
  Rank.eight,
  Rank.first
);
