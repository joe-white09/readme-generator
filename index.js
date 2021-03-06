// TODO: Include packages needed for this application
const generateMarkdown = require('./utils/generateMarkdown.js');
const inquirer = require("inquirer");
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your project? (Required)',
      validate: titleInput => {
        if (titleInput) {
          return true;
        } else {
          console.log('Please enter your project title!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Please enter a description of your project',
      validate: descriptionInput => {
        if (descriptionInput) {
          return true;
        } else {
          console.log('You must enter your project description!');
          return false;
        }
      }
    },
    {
      type: 'list',
      name: 'license',
      message: 'Please select the license you would like to apply',
      choices: ['MIT', 'Apache_2.0', 'GPLv3','BSD_3--Clause', 'None'],
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub username (Required)',
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter your username!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'email',
      message: 'Please enter your email address (Required)',
      validate: emailInput => {
        if (emailInput) {
          return true;
        } else {
          console.log('Please enter your email address!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Please provide some instructions and examples for use',
      validate: usageInput => {
        if (usageInput) {
          return true;
        } else {
          console.log('Please enter usage information!')
        }
      }
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Please enter your installation instructions',
      validate: installationInput => {
        if (installationInput) {
          return true;
        } else {
          console.log('You must enter installation instructions')
        }
      }
    },
    {
      type: 'confirm',
      name: 'contributing',
      message: 'Would you like to allow others to contribute?',
      default: false
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Please describe any tests for your project or leave blank if none',
    }

  ])
};



// TODO: Create a function to write README file
const writeFile = fileContent => {
  return new Promise((resolve, reject) => {
    fs.writeFile('./dist/README.md', fileContent, err => {
      // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
      if (err) {
        reject(err);
        // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
        return;
      }

      // if everything went well, resolve the Promise and send the successful data to the `.then()` method
      resolve({
        ok: true,
        message: 'File created!'
      });
    });
  });
};

// TODO: Create a function to initialize app
function init() {
  questions()
  .then(readmeData => {
    console.log(readmeData);
    return generateMarkdown(readmeData);
  })
  .then(readme => {
    return writeFile(readme);
  })
};

// Function call to initialize app
init();