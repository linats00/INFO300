// Lina Som - program #4: broken code debugger

const readlineSync = require('readline-sync');

let start = readlineSync.question("Enter start number: ");
let end = readlineSync.question("Enter end number: ");

// fixed: convert input from string to integer so we can do numeric comparisons and looping
start = parseInt(start, 10);
end = parseInt(end, 10);

let count = 0;
for (let i = start; i <= end; i++) {
    // fixed: use modulo operator to check if number is even (i % 2 ===0), not division
if (i % 2 === 0) {
    // fixed: use += to increment count instead of =+ which just assigns +1
count += 1;
}
}
console.log("Even numbers between " + start + " and " + end + ": " +
count);