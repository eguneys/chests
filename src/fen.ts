import { Maybe } from './types';
import { Pos } from './pos';
import { Color, isColorKey } from './role';
import { Board } from './board';
import { Piese } from './piese';
import { File, Rank } from './dir';
import { Situation } from './situation';
import { D0, D1, isD0Key } from './disp';
import { Piece, isPieceKey } from './piece';

export const initial = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const initialSituation = situation(initial);

export function situation(fen: string): Maybe<Situation> {

  let [boardS, colorS] = fen.split(' ');

  let ranksS = boardS.split('/');

  let turn = Color.white;

  if (isColorKey(colorS)) {
    turn = Color.key(colorS);
  }

  let pieses: Array<Piese> = [];
  let rank: Maybe<Rank> = Rank.eight
  
  for (let rankS of ranksS) {
    let file: Maybe<File> = File.a;
    if (!rank) {
      break;
    }
    for (let char of rankS) {
      if (!file) {
        break;
      }
      if (isPieceKey(char)) {
        let piece = Piece.key(char);
        pieses.push(Piese.make(piece, file.rank(rank)));
        file = file.right
      } else {
        let dchar = parseInt(char);
        if (isD0Key(dchar)) {
          file = file.d0(D0.key(dchar));
        }
      }
    }
    rank = rank.down;
  }

  let board = Board.make(pieses);

  return Situation.make(board, turn);  
}

export function fen({ board, turn }: Situation): string {
  let rest = "KQkq - 0 1";
  rest = '- - 0 1';
  return `${board.fen} ${turn.key} ${rest}`;
}
