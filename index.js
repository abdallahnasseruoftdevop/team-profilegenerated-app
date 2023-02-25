// Packages
const fs = require('fs');
const inquirer = require('inquirer');
const generateHTML = require('./src/generateHtmlPage');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
const Engineer = require('./lib/Engineer');

// Class containing all questions
class Prompt {
    constructor() {
        this.teamArray = [];
    }
    getTeamArray() {
        return this.teamArray;
    }


    getTeamArray() {
        return this.teamArray;
    }

    // Ask user to input information for their team
    questions() {
        inquirer.prompt({
            type: 'list',
            name: 'employeeType',
            message: "What kind of employee are you interested in recruiting for the team?",
            choices: ['Manager', 'Engineer', 'Intern', 'I am Done']
        }).then(({ employeeType }) => {
            switch (employeeType) {
                case 'Manager': {
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'name',
                            message: "Please enter the manager's name",
                            validate: nameInput => nameInput ? true : console.log("Please enter the manager's name!")
                        },
                        {
                            type: 'number',
                            name: 'id',
                            message: "Please enter the manager's employee id",
                            validate: idInput => idInput ? true : console.log("Please enter a correct answer, the employee id should be a number!")
                        },
                        {
                            type: 'input',
                            name: 'email',
                            message: "Please enter the manager's email",
                            validate: emailInput => emailInput ? true : console.log("Please enter the correct manager's email!")
                        },
                        {
                            type: 'number',
                            name: 'officeNumber',
                            message: "Please enter the manager's office number",
                            validate: officeNumberInput => officeNumberInput ? true : console.log("Please enter a correct answer, the office number should be a number!")
                        }
                    ]).then(templateData => {
                        const newManager = new Manager(templateData.name, templateData.id, templateData.email, templateData.officeNumber)
                        this.teamArray.push(newManager);
                        this.questions();
                    });
                    break;
                }
                case 'Engineer': {
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'name',
                            message: "Please enter the engineer's name",
                            validate: nameInput => nameInput ? true : console.log("Please enter the engineer's name!")
                        },
                        {
                            type: 'number',
                            name: 'id',
                            message: "Please enter the engineer's employee id",
                            validate: idInput => idInput ? true : console.log("Please enter a correct answer, the employee id should be a number!")
                        },
                        {
                            type: 'input',
                            name: 'email',
                            message: "Please enter the engineer's email",
                            validate: emailInput => emailInput ? true : console.log("Please enter the correct engineer's email!")
                        },
                        {
                            type: 'input',
                            name: 'github',
                            message: "Please enter the engineer's github username",
                            validate: githubInput => githubInput ? true : console.log("Please enter the correct engineer's github username!")
                        }
                    ]).then(templateData => {
                        const newEngineer = new Engineer(templateData.name, templateData.id, templateData.email, templateData.github);
                        this.teamArray.push(newEngineer);
                        this.questions();
                    });
                    break;
                }
                case 'Intern': {
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'name',
                            message: "Please enter the intern's name",
                            validate: nameInput => {
                                if (nameInput) {
                                    return true;
                                } else {
                                    console.log("Please enter the intern's name!");
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'number',
                            name: 'id',
                            message: "Please enter the intern's employee id",
                            validate: idInput => {
                                if (idInput) {
                                    return true;
                                } else {
                                    console.log("Please enter a correct answer, the employee id should be a number!");
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'input',
                            name: 'email',
                            message: "Please enter the intern's email",
                            validate: emailInput => {
                                if (emailInput) {
                                    return true;
                                } else {
                                    console.log("Please enter the correct intern's email!");
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'input',
                            name: 'school',
                            message: "Please enter the intern's school name",
                            validate: schoolInput => {
                                if (schoolInput) {
                                    return true;
                                } else {
                                    console.log("Please enter the correct intern school's name!");
                                    return false;
                                }
                            }
                        }
                    ]).then(templateData => {
                        const newIntern = new Intern(templateData.name, templateData.id, templateData.email, templateData.school);
                        this.teamArray.push(newIntern);
                        // Sends user back to menu
                        this.questions();
                    });
                }
                case 'I am Done': {
                    //function that writes the html file in the dist folder
                    const pagehtml = generateHTML(this.getTeamArray());
                    fs.writeFile('./dist/index.html', pagehtml, err => {
                        if (err) throw new Error(err);

                        console.log('Page created! Check out index.html in the dist/ folder to see it!');
                    });
                }
            }
        });
    }
}
        // Activates prompts in CLI
        const prompt = new Prompt();
        prompt.questions();

        module.exports = Prompt;
    























