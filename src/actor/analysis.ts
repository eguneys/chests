import { Situation } from '../situation';
import { Board } from '../board';
import { Piese } from '../piese';
import { Pos } from '../pos';
import { Role, Color } from '../role';
import { ColorMap } from '../cmap';
import { Actor } from './actor';
import { CastlesOn } from './castle';
import { Pressure } from './pressure';
import { PawnPush } from './pawnpush';

export class Analysis {

  static make = (situation: Situation): Analysis => new Analysis(situation);

  readonly situation: Situation

  readonly us: Array<Actor>
  readonly them: Array<Actor>

  get board(): Board {
    return this.situation.board;
  }
  
  get turn(): Color {
    return this.situation.turn;
  }

  get ourPawnPushes(): Array<PawnPush> {
    return this.us.flatMap(_ => _.pawnPushes);
  }
  
  get ourPressures(): Array<Pressure> {
    return this.us.flatMap(_ => _.pressures);
  }

  get ourCastles(): Array<CastlesOn> {
    return this.us.flatMap(_ => _.castles);
  }

  get ourDirectPressures(): Array<Pressure> {
    return this.ourPressures.filter(_ => _.direct);
  }

  get theirPressures(): Array<Pressure> {
    return this.them.flatMap(_ => _.pressures);
  }

  get theirDirectPressures(): Array<Pressure> {
    return this.theirPressures.filter(_ => _.direct);
  }

  get theirChecks(): Array<Pressure> {
    return this.theirPressures.filter(_ => _.checks);
  }

  get ourKingCaptures(): Array<Pressure> {
    return this.ourPressures
      .filter(_ => _.captures &&
        _.on?.is(Role.king));
  }

  get noKingCapture(): boolean {
    return this.ourKingCaptures.length === 0;
  }

  constructor(situation: Situation) {

    this.situation = situation;

    this.us = situation.board.values
      .filter(_ => _.color.equals(this.situation.turn))
      .map(piese => Actor.make(piese, situation.board));

    this.them = situation.board.values
      .filter(_ => _.color.equals(this.situation.turn.opposite))
      .map(piese => Actor.make(piese, situation.board));
  }
}
