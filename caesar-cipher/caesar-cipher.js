#! /usr/bin/env node

const args = process.argv.slice(2);

const red = '\x1b[31m';
const green = '\x1b[32m';
const reset = '\x1b[0m';

if (args.length !== 2 || !isFinite(args[1])) {
  console.log();
  console.log(red + 'Wrong input format: string integer' + reset);
  console.log();
  process.exitCode = 1;
  return;
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const offsetInput = parseInt(args[1]);

const offset = offsetInput % alphabet.length;

const offsetAlphabet =
  offset > 0
    ? alphabet.slice(offset) + alphabet.slice(0, offset)
    : alphabet.slice(alphabet.length + offset) + alphabet.slice(0, alphabet.length + offset);

const originalAlphMap = {};
for (let i = 0; i < alphabet.length; i++) {
  originalAlphMap[alphabet[i]] = i;
}
const toCipher = args[0];

let out = '';

const isUpperCase = (letter) => letter === letter.toUpperCase();

const punctuation = new Set([
  '"',
  ' ',
  '.',
  ',',
  ';',
  ':',
  '-',
  '_',
  '!',
  '?',
  "'",
  '`',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
]);

for (let i = 0; i < toCipher.length; i++) {
  const letter = toCipher[i];
  let newLetter = '';
  if (punctuation.has(letter)) {
    newLetter = letter;
  } else if (isUpperCase(letter)) {
    newLetter = offsetAlphabet[originalAlphMap[letter.toLowerCase()]].toUpperCase();
  } else {
    newLetter = offsetAlphabet[originalAlphMap[letter]];
  }

  out += newLetter;
}

console.log();
console.log(green + out + reset);
console.log();
