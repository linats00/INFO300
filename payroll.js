const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function employeePrompt(employeeNumber) {
    return new Promise((resolve) => {
        rl.question(`Employee ${employeeNumber} name: `, (name) => {
            rl.question(`Employee ${employeeNumber} hours worked: `, (hours) => {
                rl.question(`Employee ${employeeNumber} hourly rate: `, (rate) => {
                    resolve({ 
                        name: name, 
                        hours: parseFloat(hours), 
                        rate: parseFloat(rate) });
                });
            });
        });
    });
}

async function main() {
    const employees = [];

    for (let i = 1; i <= 3; i++) {
        const employee = await employeePrompt(i);
        employees.push(employee);
    }

    console.log("\nPayroll Information:");
    employees.forEach((emp, i) => {
        console.log('${i + 1}. $emp.name} - Hours: ${emp.hours}, Rate: $${emp.rate}, Pay: $${(emp.hours * emp.rate).toFixed(2)}');
    });

    rl.close();
}

main();