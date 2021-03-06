const Employee = require("./lib/Employee")
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");


//setting questions for generating employees
let employeeArray = [];

const questions = [
    {
        type: 'input',
        name: 'teamMemberName',
        message: "What is the team member's name",
    },
    // {
    //     type: 'input',
    //     name: 'memberID',
    //     message: "What is the team member's ID number?"
    // },
    {
        type: 'input',
        name: 'email',
        message: "What is the team member's email?"
    },
    {
        type: 'list',
        name: 'role',
        message: "What is the team member's poistion?",
        choices: [
            'Manager',
            'Engineer',
            'Intern'
        ]
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: "What is the manager's office number?",
        when: function(answers){
            return answers.role === "Manager"
        }
    },
    {
        type: 'input',
        name: 'github',
        message: "What is the engineer's github?",
        when: function(answers) {
            return answers.role === "Engineer"
        }
    },
    {
        type: 'input',
        name: 'school',
        message: 'What is your school?',
        when: function(answers) {
          return answers.role === "Intern";
        }
    },    
    {
        type: 'confirm',
        name: 'askAgain',
        message: 'Want to add another employee (just hit enter for YES)?',
        default: true
      }
]

function questionsInq(){
    inquirer.prompt(questions).then(answers => {
        // console.log(answers);

        if(answers.role === "Manager"){
            employeeArray.push(new Manager(answers.teamMemberName, employeeArray.length + 1, answers.email, answers.officeNumber))
        }

        else  if(answers.role === "Engineer"){
            employeeArray.push(new Engineer(answers.teamMemberName, employeeArray.length + 1, answers.email, answers.github))
        }

        else  if(answers.role === "Intern"){
            employeeArray.push(new Intern(answers.teamMemberName, employeeArray.length + 1, answers.email, answers.school))
        }

        if (answers.askAgain) {
            questionsInq()
        }
        else{
            console.log(render(employeeArray))
            fs.writeFile(outputPath, render(employeeArray), error => console.log(error))
        }
        // console.log(employeeArray)
    });

}

questionsInq()


