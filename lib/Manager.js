// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    };
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
    getOfficeNumber() {
        const number = this.officeNumber;
        return number
    };
    getRole() {
        let role = "Manager";
        return role
    }
}

module.exports = Manager;

// add validation to ensure user input is in the proper format