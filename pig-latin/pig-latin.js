#! /usr/bin/env node

// Getting user input
const args = process.argv.slice(2);

// if the user didn't type one string,
// we give an error message and exit the program
if (args.length !== 1) {
  console.log('Please input a single string - Format: "Pig latin is great"');
  process.exitCode = 1;
  return;
}

// splitting the user input into words
const inputArr = args[0].split(' ');

// quick lookup for special characters
// Sets are super cool!
// They are data structures, that can hold only unique values.
// Looking up, if something is in a set - if it exists - is superfast - much faster that checking array.includes(thing)
const punctation = new Set(['.', ',', ';', '!', '?', '-']);

// quick lookup for vowels
const vowels = new Set(['a', 'A', 'e', 'E', 'i', 'I', 'o', 'O', 'u', 'U']);

// utility functions for checking, if a letter is uppercase
const isUpperCase = (letter) => letter === letter.toUpperCase();
// ... and for capitalizing a word ("word" -> "Word")
const capitalize = (word) => word[0].toUpperCase() + word.slice(1).toLowerCase();

// Let's loop over the iser input word for word...
for (let i = 0; i < inputArr.length; i++) {
  // getting the single word (for readability)
  let word = inputArr[i];
  // getting the word's fist letter (also readability)
  const firstLetter = word[0];

  // hold a possible special character
  let punct = '';

  // if the last character is special (e.g "Hello," -> ",")
  // store it in punct and use only the other stuff as *word*
  // (could be improved upon to take care of multiple special chars ("hello!!!"))
  // or special chars at other positions ("it's")
  if (punctation.has(word[word.length - 1])) {
    punct = word[word.length - 1];
    word = word.slice(0, word.length - 1);
  }

  // check if the first letter is a vowel
  if (vowels.has(firstLetter)) {
    // replace the word in the holding array with these strings attached :)
    inputArr[i] = word + 'way' + punct;
    // stop here and continue the loop with the next word
    continue;
  }

  // getting the second letter (readability...)
  const secondLetter = word[1];

  // ternary
  // if the second letter is a vowel,
  // put it at the end of the word
  // else - put the first two letters at the end
  word = vowels.has(secondLetter) ? word.slice(1) + firstLetter : word.slice(2) + word.slice(0, 2);

  // if the first letter was uppercase, capitalize the word
  // elloH -> Elloh
  if (isUpperCase(firstLetter)) word = capitalize(word);

  // finally attach 'ay' and the special character and put the changed word back in the array
  inputArr[i] = word + 'ay' + punct;
}

// some fancy math I adopted here: https://flaviocopes.com/go-tutorial-lolcat/
// it takes in an index (from a loop) and gives back red, green, blue values for fancy colors, creating a rainbow in succesion
const rainbow = (i) => {
  const f = 0.1;
  const r = Math.floor(Math.sin(f * i + 0) * 127 + 128);
  const g = Math.floor(Math.sin(f * i + 2) * 127 + 128);
  const b = Math.floor(Math.sin(f * i + 4) * 127 + 128);
  return { r, g, b };
};

// for pausing the program
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// in order to print letter by letter in a visible way, the program needs to be paused slightly
// async functions allow us to *await* a promise to resolve
const printOutput = async function () {
  console.log('\n');
  // splitting the whole, pig translated array and split it into single letters
  const inputArrJoined = inputArr.join(' ').split('');

  // for each letter...
  for (let i = 0; i < inputArrJoined.length; i++) {
    const letter = inputArrJoined[i];
    // get a fancy color
    const { r, g, b } = rainbow(i);
    // write the letter to the console, but right next to the last letter
    // apply the fancy color
    process.stdout.write(`\x1b[38;2;${r};${g};${b}m${letter}\x1b[0m`);
    // wait a bit, before the next letter is printed
    await wait(25);
  }
  console.log('\n');
};

// run the output function
printOutput();
