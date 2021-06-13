# Chests ![test workflow](https://github.com/eguneys/tamcher/actions/workflows/test.yml/badge.svg) [![Coverage Status](https://coveralls.io/repos/github/eguneys/chests/badge.svg?branch=master)](https://coveralls.io/github/eguneys/chests?branch=master)

Chess API immutable free of side effects in Typescript.

Based on [Scalachess](https://github.com/ornicar/scalachess).

## Install

`yarn add chests --save`

## Use

```
  import { situation,
    Situation,
    sanOrCastles,
    San } from 'chests';

    let fromPosition: Situation = situation('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')!;

    fromPosition = fromPosition
        .sanOrCastles(sanOrCastles('e4')!)!;

    console.log(fromPosition.fen);
  
```


## API

