// TODO: Write code to define and export the Employee class
class Employee {
    //constructor function
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = "Employee";
    }

    // functions
    grabName(){
        return this.name;
    }

    grabId(){
        return this.id;
    }

    grabEmail(){
        return this.email;
    }

    grabRole(){
        return this.role;
    }

};

module.exports = Employee;