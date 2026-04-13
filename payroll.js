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
                        console.log("Hourly rate must be positive number");
                        resolve(employeePrompt(employeeNumber));
                    } else if (isNaN(hoursWorked) || hoursWorked < 0 || hoursWorked > 80) {
                        console.log("Hours worked must be between 0 and 80");
                        resolve(employeePrompt(employeeNumber));
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

    const payrollData = employees.map(emp => {
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

        return {
            name: emp.name,
            totalHours: emp.hoursWorked,
            regularPay: regularPay,
            overtimePay: overtimePay,
            totalPay: totalPay
        };

    });

    let highestPaidEmployee = payrollData[0];
    for (let i = 1; i < payrollData.length; i++) {
        if (payrollData[i].totalPay > highestPaidEmployee.totalPay) {
            highestPaidEmployee = payrollData[i];
        }
    }

    console.log("\nPayroll Data:");
    payrollData.forEach(emp => {
        const prefix = emp === highestPaidEmployee ? ">> Highest Paid Employee: " : "Employee: ";
        console.log(`${prefix}${emp.name}`);
        console.log(`  Total Hours: ${emp.totalHours}`);
        console.log(`  Regular Pay: $${emp.regularPay.toFixed(2)}`);
        console.log(`  Overtime Pay: $${emp.overtimePay.toFixed(2)}`);
        console.log(`  Total Pay: $${emp.totalPay.toFixed(2)}`);
    });

    console.log(`\nTop earner: ${highestPaidEmployee.name} with $${highestPaidEmployee.totalPay.toFixed(2)} total pay.`);

    rl.close();
}

main();