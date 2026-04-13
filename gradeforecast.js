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

function getLetterGrade(score) {
    if (score >= 90) {
        return 'A';
    }
    else if (score >= 80) {
        return 'B';
    }
    else if (score >= 70) {
        return 'C';
    }
    else if (score >= 60) {
        return 'D';
    }
    return 'F';
}

function compareGrades(current, projected) {
    if (projected > current) return 'improved';
    if (projected < current) return 'declined';
    return 'stayed the same';
}

async function main() {
    const currentGrade = await promptForCurrentGrade();
    console.log(`Current grade: ${currentGrade}`);

    const finalExamScores = [];
    let moreScores = true;

    while (moreScores) {
        const examScore = await promptForFinalExamScore();
        finalExamScores.push(examScore);
        moreScores = await promptForMoreScores();
    }

    console.log("\nResults:");
    for (const examScore of finalExamScores) {
        const finalCourseAverage = currentGrade * 0.75 + examScore * 0.25;
        const letterGrade = getLetterGrade(finalCourseAverage);
        const trend = compareGrades(currentGrade, finalCourseAverage);

        console.log(`\nFinal Exam Score: ${examScore}`);
        console.log(`Final Course Average: ${finalCourseAverage.toFixed(2)}`);
        console.log(`Letter Grade: ${letterGrade}`);
        console.log(`Grade ${trend}.`);
    }

    rl.close();
}

main();