// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) { 
  if (license != 'None') {
    return `![License: ${license}](https://img.shields.io/badge/license-${license}-blue)`;
  } else {
    return ``;
  }
};


// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (license != 'None') {
    return `For More Information on this License, please check out this link (https://opensource.org/licenses/${license})`
  } else {
    ` `
  }
};

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if(license !=  'None') {
    return `For More information on the ${license} please see this link ${renderLicenseLink(license)}`
  } else {
    return `None`
  }
};

// function for contributing section
function renderContributorSection(contributing) {
  if(contributing) {
    return `Please feel free to help me with this project by reaching out to me via email or through my GitHub account`;
  } else {
    return `I would not like any contributors at this time`;
  }
};

// function for test section
function renderTestSection(tests) {
  if(tests != '') {
    return `${tests}`;
  } else {
    return `No tests available/necessary`;
  }
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}
  ${renderLicenseBadge(data.license)}
  

  ## Description
  ${data.description}

  ## Table of Contents

  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)

  ## Installation
  ${data.installation}

  ## Usage
  ${data.usage}

  ## License
  ${renderLicenseSection(data.license)}

  ## Contributing
  ${renderContributorSection(data.contributing)}

  ## Tests
  ${renderTestSection(data.tests)}

  ## Questions
  If you have any questions, you can reach out to me via email at ${data.email}
  or check out my Github profile at [https://www.github.com/${data.github}]
  
`;
}

module.exports = generateMarkdown;
