# to-do-app

Here we used mongodb to save the to-do data.
We can create, update, delete our data.

<br><br>
To create package.json file, run this command:
npm init -y

<br><br>
To install express, run this command:
npm install express

<br><br>
For automatic run node:
npm install nodemon

Maybe we find some error if we don't run this command as a administrator. 
So, if you find any kind of error, please run this command as a administrator.

<br><br>
now we can run our app using this command:
nodemon server or nodemon server.js
<br><br>
we can do another thing to run our app.
Add a script in your package.json file's 'script' object.
We will not modify 'start' property. We will add another property named 'watch'.

"watch": "nodemon server",
<br><br>


now we can run this command:
npm run watch

<br><br>
<br><br>
Install mongodb using this command:
npm install mongodb

<br>
White list all ip address: 0.0.0.0/0