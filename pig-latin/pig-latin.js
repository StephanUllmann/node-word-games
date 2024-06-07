#! /usr/bin/env node

const args = process.argv.slice(2);

if (args.length !== 1) {
  console.log('Please input a single string - Format: "Pig latin is great"');
  process.exitCode = 1;
  return;
}

const inputArr = args[0].split(' ');

const punctation = new Set(['.', ',', ';', '!', '?', '-']);

const vowels = new Set(['a', 'A', 'e', 'E', 'i', 'I', 'o', 'O', 'u', 'U']);

const isUpperCase = (letter) => letter === letter.toUpperCase();
const capitalize = (word) => word[0].toUpperCase() + word.slice(1).toLowerCase();

for (let i = 0; i < inputArr.length; i++) {
  let word = inputArr[i];
  const firstLetter = word[0];

  let punct = '';

  if (punctation.has(word[word.length - 1])) {
    punct = word[word.length - 1];
    word = word.slice(0, word.length - 1);
  }

  if (vowels.has(firstLetter)) {
    inputArr[i] = word + 'way' + punct;
    continue;
  }
  const secondLetter = word[1];

  word = vowels.has(secondLetter) ? word.slice(1) + firstLetter : word.slice(2) + word.slice(0, 2);

  if (isUpperCase(firstLetter)) word = capitalize(word);

  inputArr[i] = word + 'ay' + punct;
}

const rainbow = (i) => {
  const f = 0.1;
  const r = Math.floor(Math.sin(f * i + 0) * 127 + 128);
  const g = Math.floor(Math.sin(f * i + 2) * 127 + 128);
  const b = Math.floor(Math.sin(f * i + 4) * 127 + 128);
  return { r, g, b };
};

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const printOutput = async function () {
  console.log('\n');
  const inputArrJoined = inputArr.join(' ').split('');
  for (let i = 0; i < inputArrJoined.length; i++) {
    const letter = inputArrJoined[i];
    const { r, g, b } = rainbow(i);
    await wait(25);
    process.stdout.write(`\x1b[38;2;${r};${g};${b}m${letter}\x1b[0m`);
  }
  console.log('\n');
};

printOutput();
