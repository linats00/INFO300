// Lina Som - program #2: fibonacci filter
const readlineSync = require('readline-sync');

// 1. prompt the user for a number n (> 0)
const input = readlineSync.question('Enter how many Fibonacci numbers to generate (m > 0): ');
const n = Number(input);

if (!Number.isInteger(n) || n <= 0) {
  console.log('Invalid input.Please enter a positive integer greater than 0.');
  process.exit(1);
}

// 2. generate the first n Fibonacci numbers
const fib = [];

if (n >= 1) {
    fib.push(0);
}
if (n >= 2) {
    fib.push(1);
}

for (let i = 2; i < n; i++) {
    const next = fib[i - 1] + fib[i - 2];
    fib.push(next);
}


// 3. filters and prints only the odd Fibonacci numbers from that sequence
const oddFib = [];

for (let i = 0; i < fib.length; i++) {
    const value = fib[i];
    if (value % 2 !== 0) {
        oddFib.push(value);
    }
}

console.log('Full sequence: ' + JSON.stringify(fib));
console.log('Odd Fibonacci numbers: ' + JSON.stringify(oddFib));
