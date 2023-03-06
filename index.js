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
const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the team Managers name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email address?"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the office number?"
    }
];

const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the team Engineer's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email address?"
    },
    {
        type: "input",
        name: "github",
        message: "What is the Engineer's GitHub username?"
    }
];

const InternQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the Intern's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email address?"
    },
    {
        type: "input",
        name: "school",
        message: "What school did the Intern go to?"
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
                // Generate the HTML for the team using the team array
                // Use the answers to generate HTML content for the team page
                const htmlContent = render(team);

                // Write the HTML to a file
                fs.writeFile(outputPath, htmlContent, (err) => {
                    // if error console.log the error if not display the message
                    err ? console.error(err) : console.log("Successfully generated team member's page")
                })
            // break;
            //     default:
            // console.log("Invalid option selected");
        }
    })
}