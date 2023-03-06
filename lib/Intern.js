// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    getName() {
        const name = this.name;
        return name
    };
    getId() {
        const id = this.id;
        return id
    };
    getEmail() {
        const email = this.email;
        return email
    };

    getSchool() {
        return this.school;
    }

    getRole() {
        let role = "Intern";
        return role;
    }
}

module.exports = Intern;