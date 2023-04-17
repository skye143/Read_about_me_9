// Packages needed for this application
const inquirer = require('inquirer');
const markdown = require('./us/markdown.js');
const fs = require('fs');



// Array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'githubUsername',
        message: 'What is your GitHub Username? (Required)',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter your GitHub username!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address? (Required)',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter your email address!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your assignment? (Required)',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('Please enter your assignment title!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'what',
        message: 'What is your assignment and what issues will it be resolving?(Required)',
        validate: whatInput => {
            if (whatInput) {
                return true;
            } else {
                console.log('Please enter what your assignment is!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'why',
        message: 'Why did you create this assignment? (Required)',
        validate: whyInput => {
            if (whyInput) {
                return true;
            } else {
                console.log('Please enter why you created this assignment!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'how',
        message: 'How will someone be able to use this? (Required)',
        validate: howInput => {
            if (howInput) {
                return true;
            } else {
                console.log('Please enter how your users can use this assignment!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please enter a  step-by-step installation instructions for your assignment. (Required)',
        validate: installInput => {
            if (installInput) {
                return true;
            } else {
                console.log('Please enter your installation instructions!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please provide instructions and examples for use. (Required)',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Please enter your use instructions!');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'license',
        message: 'Which license will you use for your assignment?',
        choices: ['agpl', 'apache', 'mit', 'no license']
    },
    {
        type: 'confirm',
        name: 'confirmContributers',
        message: 'Would you like to allow other developers to contribute?',
        default: true
    },
    {
        type: 'input',
        name: 'contribute',
        message: 'Please provide guidelines for contributing. Do you want third parties to contribute? (Required)',
        when: ({ confirmContributers }) => {
            if (confirmContributers) {
                return true;
            } else {
                return false;
            }
        },
        validate: contributerInput => {
            if (contributerInput) {
                return true;
            } else {
                console.log('Please enter contributer guidelines!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'test',
        message: 'Please provide instructions on how to test the app. (Required)',
        validate: testInput => {
            if (testInput) {
                return true;
            } else {
                console.log('Please enter your use test instructions!');
                return false;
            }
        }
    }
];

// function to write README file
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./db/generated-README.md', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'Your File Has Been Created!'
            });
        });
    });
};

// function to prompt questions and store user inputs
const init = () => {

    return inquirer.prompt(questions)
    .then(readmeData => {
        return readmeData;
    })
}

// Function call to initialize app
init()
.then(readmeData => {
    console.log(readmeData);
    return markdown(readmeData);
})
.then(pageMD => {
    return writeFile(pageMD);
})
.then(writeFileResponse => {
    console.log(writeFileResponse.message);
})
.catch(err => {
    console.log(err);
})