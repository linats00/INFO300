// Lina Som - program #1: detect prime gaps
const readLineSync = require('readline-sync');

// 1. prompt the user for a positive number m, n <= 10000.
const input = readLineSync.question('Enter a positive number (<= 1000): ');
const n = Number(input);

if (!Number.isInteger(n) || n <= 1 || n > 1000) {
    console.log('Invalid input. Please run the program again and enter an integer between 2 and 1000.');
    process.exit(1);
}

// 2. find all prime numbers up to n.
function isPrime(num) {
    if (num < 2) {
        return false;
    }

    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) {
            return false;
        }
    }

    return true;
}


const primes = [];
for (let i = 2; i <= n; i++) {
    if (isPrime(i)) {
        primes.push(i);
    }
}
console.log('Program displays the primes up to ' + n + '; ' + JSON.stringify(primes));

if (primes.length < 2) {
    console.log('Not enough prime numbers to calculate gaps.');
    process.exit(0);
}

let largestGap = -1;
let largestGapIndex = -1; // index in primes where gap starts
const gaps = [];

for (let i = 0; i < primes.length - 1; i++) {
    const gap = primes[i + 1] - primes[i];
    gaps.push(gap);

    if (gap > largestGap) {
        largestGap = gap;
        largestGapIndex = i; // gap is between primes[i] and primes[i+1]
    }
}


const startPrime = primes[largestGapIndex];
const endPrime = primes[largestGapIndex + 1];

console.log('The largest gap is ' + largestGap + ', between ' +  startPrime + ' and ' + endPrime);

let sum = 0;
for (let i = 0; i < gaps.length; i++) {
    sum += gaps[i];
}

const averageGap = sum / gaps.length;

// round to 2 decimal places
const averageGapRounded = averageGap.toFixed(2);

console.log('The average gap is ' + averageGapRounded);

