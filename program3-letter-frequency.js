// Lina Som - program #3: letter frequency & first repeat
const readlineSync = require('readline-sync');

// 1. prompt the user for a string
const input = readlineSync.question('Enter a string: ');

// make it case-insensitive
const text = input.toLowerCase();

// 2. count how many times each letter a-z appears
const freq = {};
let firstRepeat = null;

for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch >= 'a' && ch <= 'z') {
        if (!freq[ch]) {
            freq[ch] = 0;
        }
        freq[ch]++;

        // 3. find the first letter that repeats
        if (freq[ch] === 2 && firstRepeat === null) {
            firstRepeat = ch;
        }
    }
}

console.log('Letter frequencies: ');
    for (const letter in freq) {
        console.log(letter + ': ' + freq[letter]);
    }

    if (firstRepeat !== null) {
        console.log('First repeated letter: ' + firstRepeat);
    } else {
        console.log('No letter appears more than once.');
    }

