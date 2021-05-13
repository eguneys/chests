import { Situation } from '../situation';
import { Analysis } from './analysis';
import { Move, isMove } from '../move';
import { UciOrCastles } from '../uci';
import { isCastles, Castles } from '../san';

export class Tactician {

  static make = (situation: Situation) => new Tactician(situation);

  analysis: Analysis

  constructor(situation: Situation) {
    this.analysis = Analysis.make(situation);
  }

}
