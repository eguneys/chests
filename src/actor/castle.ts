
  // get moves(): Array<Move> {
  //   let situation = this.situation;

  //   let king = this.piece,
  //   rook = Role.rook.color(this.color);

  //   let origKingPos = this.pos;
    
  //   return Castles.all.map(castles => {

  //     let destKingPos = origKingPos.cfile(castles.king);

  //     let koor = origKingPos.route(castles.trip.rank());
  //     let origRookse = this.board
  //       .onRoute(koor)
  //       .filter(_ => _.piece.equals(rook))[0];

  //     if (!origRookse || !origRookse.piece.is(Role.rook)) {
  //       return;
  //     }

  //     let origRookPos = origRookse.pos;
  //     let destRookPos = origRookPos.cfile(castles.rook);

  //     let after = this.board.castle(origKingPos, destKingPos, origRookPos, destRookPos);

  //     if (!after) {
  //       return;
  //     }

  //     return Move.make(king,
  //                      situation,
  //                      after,
  //                      origKingPos,
  //                      destKingPos,
  //                      undefined,
  //                      undefined,
  //                      castles);
  //   }).filter<Move>(isMove);
  // }
