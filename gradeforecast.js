const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptForCurrentGrade() {
    return new Promise((resolve) => {
        rl.question("Current grade: ", (grade) => {
            const currentGrade = parseFloat(grade);
            if (isNaN(currentGrade) || currentGrade < 0 || currentGrade > 100) {
                console.log("Enter a grade between 0 and 100.");
                resolve(promptForCurrentGrade());
            } else {
                resolve(currentGrade);
            }
        });
    });
}

function promptForFinalExamScore() {
    return new Promise((resolve) => {
        rl.question("Final exam score: ", (score) => {
            const examScore = parseFloat(score);
            if (isNaN(examScore) || examScore < 0 || examScore > 100) {
                console.log("Enter a score between 0 and 100.");
                resolve(promptForFinalExamScore());
            } else {
                resolve(examScore);
            }
        });
    });
}

function promptForMoreScores() {
    return new Promise((resolve) => {
        rl.question("Enter another final score? (y/n): ", (answer) => {
            const normalized = answer.trim().toLowerCase();
            resolve(normalized === 'y' || normalized === 'yes');
        });
    });
}

async function main() {
    const currentGrade = await promptForCurrentGrade();
    console.log(`Current grade: ${currentGrade}`);

    let moreScores = true;
    while (moreScores) {
        const examScore = await promptForFinalExamScore();
        const projectedGrade = currentGrade * 0.75 + examScore * 0.25;
        console.log(`With a final exam score of ${examScore}, your final grade would be ${projectedGrade.toFixed(2)}.`);

        moreScores = await promptForMoreScores();
    }

    rl.close();
}

main();