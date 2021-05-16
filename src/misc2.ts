import { uciOrCastles } from './uci';
import { initial, situation } from './fen';

export function fenAfterUcis(fen: string, moves: Array<string>) {

  let _sit = moves.map(uciOrCastles)
    .reduce((situation, move) => {
      if (move && situation) {
        return situation.uciOrCastles(move)?.after;
      }
    }, situation(fen === 'startpos' ? initial : fen));

  return _sit?.fen;  
}
