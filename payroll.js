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
                    const hourlyRate = parseFloat(rate);
                    const hoursWorked = parseFloat(hours);

                    if (isNaN(hourlyRate) || hourlyRate < 0) {
                        console.log("Values must be positive numbers");
                    } else if (isNaN(hoursWorked) || hoursWorked < 0) {
                        console.log("Values must be positive numbers");
                    } else {
                        resolve({ 
                            name: name, 
                            hourlyRate: hourlyRate,
                            hoursWorked: hoursWorked
                        });
                    }
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
        let regularHours, overtimeHours;

        if (emp.hoursWorked > 40) {
            regularHours = 40;
            overtimeHours = emp.hoursWorked - 40;
        } else {
            regularHours = emp.hoursWorked;
            overtimeHours = 0;
        }

        const regularPay = regularHours * emp.hourlyRate;
        const overtimePay = overtimeHours * emp.hourlyRate * 1.5;
        const totalPay = regularPay + overtimePay;

        console.log(`${i + 1}. ${emp.name} - Regular Pay: $${regularPay.toFixed(2)}, Overtime Pay: $${overtimePay.toFixed(2)}, Total Pay: $${totalPay.toFixed(2)}`);
    });

    rl.close();
}

main();