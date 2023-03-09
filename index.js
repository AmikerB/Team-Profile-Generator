const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { default: generate } = require("@babel/generator");

// TODO: Write Code to gather information about the development team members, and render the HTML file.
// function to ensure user does not leave inputs empty
function validateInput(value) {
    if (value.trim().length > 0) {
        return true;
    }
    return "Please enter a non-empty value.";
}

const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the team Managers name?",
        validate: validateInput
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee id?",
        validate: validateInput
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email address?",
        validate: validateInput
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the office number?",
        validate: validateInput
    }
];

const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the team Engineer's name?",
        validate: validateInput
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee id?",
        validate: validateInput
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email address?",
        validate: validateInput
    },
    {
        type: "input",
        name: "github",
        message: "What is the Engineer's GitHub username?",
        validate: validateInput
    }
];

const InternQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the Intern's name?",
        validate: validateInput
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee id?",
        validate: validateInput
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email address?",
        validate: validateInput
    },
    {
        type: "input",
        name: "school",
        message: "What school did the Intern go to?",
        validate: validateInput
    }
];

const team = [];

// ask for managers details first
inquirer.prompt(managerQuestions).then((managerAnswers) => {

    // push manager to team array
    let manager = new Manager(managerAnswers.name, managerAnswers.id, managerAnswers.email, managerAnswers.officeNumber);
    team.push(manager);

    //ask which team member user would like to add next
    askNext(team)
})

function askNext(team) {

    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Which team member would you like to add next?",
            choices: ["Engineer", "Intern", "I'm done adding team members"]
        }
    ]).then((answer) => {
        switch (answer.role) {
            case "Engineer":
                // Ask questions specific to Engineer role
                inquirer.prompt(engineerQuestions).then((engineerAnswers) => {
                    // Push engineer's answers to the array
                    let engineer = new Engineer(engineerAnswers.name, engineerAnswers.id, engineerAnswers.email, engineerAnswers.github);
                    team.push(engineer);
                    // Ask the user which team member to add next
                    askNext(team);
                });
                break;
            case "Intern":
                // Ask questions specific to Intern role
                inquirer.prompt(InternQuestions).then((internAnswers) => {
                    // Push intern's answers to the array
                    let intern = new Intern(internAnswers.name, internAnswers.id, internAnswers.email, internAnswers.school);
                    team.push(intern);
                    // Ask the user which team member to add next
                    askNext(team)
                });
                break;
            case "I'm done adding team members":
                // Use the answers to generate HTML content for the team page
                const htmlContent = render(team);
                // Create the output directory if it doesn't exist
                if (!fs.existsSync(OUTPUT_DIR)) {
                    fs.mkdirSync(OUTPUT_DIR);
                };
                try {
                    // Write the HTML to a file
                    fs.writeFileSync(outputPath, htmlContent);
                    console.log("Successfully generated team member's page and saved to output folder.");
                } catch (err) {
                    console.log(err);
                }
                break;
            default:
                console.log("Invalid option selected");
        }
    })
}