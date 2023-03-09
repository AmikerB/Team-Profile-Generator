// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }
    getGithub() {
        const getGithub = this.github;
        return getGithub;
    };
    getRole() {
        let role = "Engineer";
        return role;
    }
}

module.exports = Engineer;

// add validation to ensure user input is in the proper format