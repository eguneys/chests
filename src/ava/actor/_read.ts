import path from 'path';
import readline from 'readline';
import fs from 'fs';

export const readMate1 = () => readPath('ten_mateIn1');
export const readMate2 = () => readPath('ten_mateIn2');

async function readPath(filename: string) {

  const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, `../../../db/${filename}.csv`))
  });

  let res = [];
  for await (let line of rl) {
    res.push(parseLine(line));
  }

  return res;
}

function parseLine(line: string) {
  let [id, fen, moves] = line.split(',')

  return {
    fen,
    moves
  };
}
