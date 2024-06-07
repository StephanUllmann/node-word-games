#! /usr/bin/env node

// Getting user input
const args = process.argv.slice(2);

// Some colors we can use in console.log() later
const red = '\x1b[31m';
const green = '\x1b[32m';
const reset = '\x1b[0m';

// If the user doesn't input two things, and the second input isn't a number,
// we display an error message and exit the progam.
if (args.length !== 2 || !isFinite(args[1])) {
  console.log();
  console.log(red + 'Wrong input format: string integer' + reset);
  console.log();
  process.exitCode = 1;
  return;
}

// the alphabet :D
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

// reading the number from the user input
const offsetInput = parseInt(args[1]);

// if the user types in a number greater than the number of letters
// in the alphabet, we get the rest, and use it as the actual shift/offset
// e.g input: 29 ->  offset: 3 (29 % 26 = 3)
const offset = offsetInput % alphabet.length;

// creating a shifted alphabet
// e.g offset = 3
// alphabet.slice(offset) -> 'defghijklmnopqrstuvwxyz'
// alphabet.slice(0, offset) -> 'abc'
// -->> 'abc' + 'defghijklmnopqrstuvwxyz'
// negative offsets will count down from the end of the alphabet
const offsetAlphabet =
  offset > 0
    ? alphabet.slice(offset) + alphabet.slice(0, offset)
    : alphabet.slice(alphabet.length + offset) + alphabet.slice(0, alphabet.length + offset);

// creating a lookup (maybe this can be done easier and more efficient)
// each letter in the alphabet will be pointing to it's own index
// basically creating a value - index lookup
// e.g {
//  "a": 0
// }
const originalAlphMap = {};
for (let i = 0; i < alphabet.length; i++) {
  originalAlphMap[alphabet[i]] = i;
}

// The string the user typed
const toCipher = args[0];

// Variable to hold the output
let out = '';

// Utility function to check if a letter is uppercase
const isUpperCase = (letter) => letter === letter.toUpperCase();

// Set of special characters - could be done better, maybe by having a set of all available characters only
// Sets are super cool!
// They are data structures, that can hold only unique values.
// Looking up, if something is in a set - if it exists - is superfast - much faster that checking array.includes(thing)
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

// For every letter in the user input...
for (let i = 0; i < toCipher.length; i++) {
  // get the letter (for readability)
  const letter = toCipher[i];
  // holding the transformed letter later
  let newLetter = '';
  // if it's a special character, simply re-use the letter
  if (punctuation.has(letter)) {
    newLetter = letter;

    // if the letter is uppercase, lowercase it first, the look up the index of the original letter, then use that index on our offset array, get that offset letter and assign it to the newletter - and uppercase that
  } else if (isUpperCase(letter)) {
    newLetter = offsetAlphabet[originalAlphMap[letter.toLowerCase()]].toUpperCase();

    // same as above but without uppercase/lowercaseing
    // again: originalAlphMap[letter] gives us the index of a letter in the alphabet
    // that can be used to get the offset letter in the other alphabet
  } else {
    newLetter = offsetAlphabet[originalAlphMap[letter]];
  }

  // attach the new letter to out output string
  out += newLetter;
}

// some display stuff
console.log();
console.log(green + out + reset);
console.log();
