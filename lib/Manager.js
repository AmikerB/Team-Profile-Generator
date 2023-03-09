// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
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