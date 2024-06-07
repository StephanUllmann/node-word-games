#! /usr/bin/env node

const args = process.argv.slice(2);

if (args.length !== 1) {
  console.error("Please write 'rock', 'paper' or 'scissors' only");
  KW;
  process.exitCode = 1;
  return;
}

// const allowedMoves = ['rock', 'paper', 'scissors', 'spock', 'lizard'];
const allowedMoves = new Set(['rock', 'paper', 'scissors', 'spock', 'lizard']);

if (!allowedMoves.has(args[0])) {
  console.error("Only 'rock', 'paper' or 'scissors' allowed");
  process.exitCode = 1;
  return;
}

const playerPick = args[0];

const computerMoves = ['rock', 'paper', 'scissors'];
const computerPick = computerMoves[Math.floor(Math.random() * computerMoves.length)];

if (playerPick === computerPick) {
  console.log('\tDRAW!');
  console.log(`You picked ${playerPick} - computer picked ${computerPick}`);
  process.exitCode = 0;
  return;
}

const winMap = {
  rock: {
    lizard: 'crushes',
    scissors: 'crushes',
  },
  lizard: {
    spock: 'poisons',
    paper: 'eats',
  },
  spock: {
    scissors: 'smashes',
    rock: 'vaporizes',
  },
  scissors: {
    paper: 'cuts',
    lizard: 'decapitates',
  },
  paper: {
    spock: 'disproves',
    rock: 'covers',
  },
};

if (winMap[playerPick][computerPick]) {
  console.log('\t\x1b[32mYou WON!!\x1b[0m');
  console.log(`\x1b[32mYour ${playerPick} ${winMap[playerPick][computerPick]} computer's ${computerPick}!\x1b[0m`);
  process.exitCode = 0;
  return;
} else {
  console.log('\t\x1b[31mYou LOST!!\x1b[0m');
  console.log(`\x1b[31mComputer's ${computerPick} ${winMap[computerPick][playerPick]} your ${playerPick}!\x1b[0m`);
}
