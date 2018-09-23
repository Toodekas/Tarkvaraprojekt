# Tarkvaraprojekt

#### Backend installation instructions:

1. Download [Wamp.NET](http://www.wamp.net/)
1. Extract it and run Wamp.NET.exe
1. Add packages "apache 2.4.25", "mariadb 10.2.6", and "php 7.2.8"
1. Start the packages
1. Clone this project
1. Create new site and set this project folder as document root
1. Verify that the site works
1. [Add new issue](https://github.com/TornOne/Tarkvaraprojekt/issues/new) describing how it doesn't work

#### Setting up developer workflow for frontend/[gatsby](https://www.gatsbyjs.org/tutorial/part-zero/)

0. Make sure you have the current stable [node](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/en/) and [git](https://git-scm.com/) installed. 
    * check if git works
        * `git --version` should output something similar to `"git version 2.9.3.windows.2"`
    * check if yarn works
        * `yarn --version` > `"1.9.4"`
    * check if node works
        * `node --version` > `"v9.6.1"`
 
1. Install global dev packages
    * Gatsby: `yarn global add gatsby-cli`
    * Any others that throw an error when running one of the later commands

2. Clone this repo and go into the frontend folder
    * `git clone https://github.com/TornOne/Tarkvaraprojekt`
    * `cd Tarkvaraprojekt`
    * `cd frontend`

3. Install all local project dependencies
    * `yarn install`

4. Start development server with hotloading
    * `yarn develop`
    * check if it's working by visiting `localhost:8000` in your browser. If there's another service running on port `8000` already, gatsby will use the next port, which can be seen from the output of `yarn develop`. 

#### Building the frontend
1. Do steps 0-3 in setting up the development environment
2. `yarn build` will build the production version of the site, outputting all the static files to `./public`
3. [optional] To test the production version of the site, an easy way is to run `yarn serve`, which will create a server from those files.
