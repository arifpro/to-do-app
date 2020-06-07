# [To-Do App](https://todo-app-arif.herokuapp.com/) &middot; [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react) [![Author Arif](https://img.shields.io/badge/Author-Arif-%3C%3E)](https://www.facebook.com/ProArif0)



This project based on JavaScript.

* **Tools:** NodeJs, Mongodb
* **Project for what:** To-Do App to create, update, delete daily task.

## Test
  * username: javascript
  * password: js

## Installation

Follow the steps:

* To create package.json file, run this command:  `npm init -y`
* To install express, run this command:  `npm install express`
* For automatic run node:  `npm install nodemon`

**Maybe you will find some error if you don't run this command as a administrator. So, if you find any kind of error, please run this command as a administrator.**

## MongoDB install and setup process

* Install mongodb using this command:  `npm install mongodb`
* White list all ip address(In mongodb atlas): `0.0.0.0/0`
* To secure out Text: `npm install sanitize-html`
* To use .env file, install dotenv using this command: `npm i dotenv`


## Run the program

now we can run our app using this command:
nodemon server or nodemon server.js

**Or**

we can do another thing to run our app.
Add a script in your `package.json` file's `'script'` object.
We will not modify `'start'` property. We will add another property named `'watch'`.

`"watch": "nodemon server",`

**now we can run out app using this command:  `npm run watch`**
