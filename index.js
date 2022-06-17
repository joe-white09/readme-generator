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
      type: 'checkbox',
      name: 'license',
      message: 'Please select the license you would like to apply',
      choices: ['MIT', 'APACHE 2.0', 'GPL 3.0','BSD 3', 'None']
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
      type: 'confirm',
      name: 'confirmUsage',
      message: 'Would you like to add project usage?',
      default: true
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Please describe the usage of your project',
      when: ({confirmUsage}) => {
        if (confirmUsage) {
          return true;
        } else {
          return false;
        }
      }
    },
  ])
};

const installation = readmeData => {
  if(!readmeData.instructions) {
    readmeData.instructions = [];
  }
  return inquirer.prompt([
    {
      type: 'input',
      name: 'installation',
      message: 'Please enter your installation instructions'
    },
    {
      type: 'confirm',
      name: 'confirmAddInstruction',
      message: 'Would you like to add another instruction?',
      default: true
    },
  ])
  .then(installData => {
    readmeData.instructions.push(installData);
    if(installData.confirmAddInstruction) {
      return installation(readmeData);
    } else {
      return readmeData;
    }
  });
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
  .then(installation)
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