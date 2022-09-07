// Include required packages
const inquirer = require("inquirer");
const fs = require("fs");

// Generating current year for license
const year = new Date().getFullYear();

// Include inquirer prompt "names" to perform substitutions in template literal
// Content of the README file
const generateMD = ({ title, describe, install, usage, github, email, phone }) =>
`#${title}  ${}

## Description
${describe}

## Table of Contents
- [Installation](#installation)

## Installation
${install}

## Usage
${usage}

## License
${licenseText}



`;

// Content of the license notice, depending on what license was selected 
const licenseText = ({ year, name, describe }) => {
    if (license === "Apache License v2.0"){
        return `
    Copyright ${year} ${name}

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.`

    } else if (license === "GNU General Public License v3.0"){
        return `
    ${describe}
    Copyright (C) ${year}  ${name}

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see [https://www.gnu.org/licenses/](https://www.gnu.org/licenses/).`
    } else if (license === "MIT License"){
        return `
    Copyright ${year} ${name}

    Permission is hereby granted, free of charge, to any person obtaining 
    a copy of this software and associated documentation files 
    (the "Software"), to deal in the Software without restriction, 
    including without limitation the rights to use, copy, modify, merge, 
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so, 
    subject to the following conditions:

    The above copyright notice and this permission notice shall be included
    in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
    IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY 
    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
    TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
    SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`
    } else if (license === "none"){
        return `
    There has not been any license selected for this project.`
    }
}

// Requesting user input with inquirer
inquirer 
	.prompt([
    {
        type: "input",
        message: "What is your full name?",
        name: "name",
    },
    {
		type: "input",
		message: "What is the title of your project, or the name of your repository?",
		name: "title",
	},
	{
		type: "input",
		message: "How would you describe your project? (What was your motivation? What problem does it solve? What did you learn?",
		name: "describe",
	},
	{
		type: "input",
        message: "What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.?",
        name: "install",
    },
    {
		type: "input",
        message: "What are instructions for usage?",
        name: "usage",
    },
    {
		type: "checkbox",
        message: "What license would you like to choose for your project? A license tells others what they can and cannot do with your code.",
        name: "license",
        choices: [
            "Apache License v2.0", "GNU General Public License v3.0", "MIT License", "none",
        ],
    },
    {
		type: "input",
        message: "How can others contribute to the code?",
        name: "phone",
    },
    {
		type: "input",
        message: "What is the URL to your GitHub?",
        name: "github",
    },
    {
		type: "input",
        message: "What is your email address?",
        name: "email",
    },
	])

    // Generating README file
	.then((answers) => {
		const mdPageContent = generateMD(answers);

		fs.writeFile("README.md", mdPageContent, (err) =>
			err ? console.log(err) : console.log("Successfully created README.md!")
		);
	});