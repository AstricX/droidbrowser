Droid browser is another FireFox alternative built in electron.
The very base of the browser is made by Ferny Web Browser as it would be too  difficult to code it from scratch.
----
How to build and run.

1. You will need node.js, git and windows build tools.
2. Go to https://nodejs.org/en/ and install latest node.js version.
3. Then go to https://git-scm.com/ and install it.
4. After that open the project in visual studio code (https://code.visualstudio.com/) AND MAKE SURE TO RUN IT AS ADMIN
5. Then create a new terminal and copy this command: $ npm i -g windows-build-tools 
then once that is finished. Run npm install to install dependencies.
Start Droid in development mode by running npm run start. If that didn't work go to package.json and find the Visual Studio Code "Debug" button and click Start Electron. And then you can close Droid and type npm run start.
