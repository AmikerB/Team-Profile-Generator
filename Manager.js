const Employee = require('./Employee');

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getRole() {
        let role = "Manager";
        return role;
    }
}


// const Jim = new Manager('Jim', 23, 'jim@mail.com', 18);

// add validation to ensure user input is in the proper format