// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }

    getGitHub() {
        console.log(this.github);
    }

    getRole() {
        let role = "Engineer";
        return role;
    }
}


const bob = new Engineer("Bob", 12, "bob@mail.com", "bobB");

console.log(bob.github);



// add validation to ensure user input is in the proper format