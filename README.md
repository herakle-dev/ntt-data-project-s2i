## Angular Project for Start2Impact
This Angular project was developed by Ivan Ferrigno as an examination project for Start2Impact. The project involves creating a mock social network using the APIs from https://gorest.co.in/. These APIs can be accessed publicly, but one of the project requirements is to use a token provided by the GoRest platform for user authentication, allowing the management of their own APIs.

The application was developed following best practices for folder organization into modules, components, services, and guards. To enhance performance, lazy loading was implemented, and all routes are protected by authentication. The application simply checks if the user has entered their token and if it is valid during the login phase. This authentication is also required for the initial page presented to the end user upon application initialization.

## Try the app online
### Deployment Links
- [Firebase link 1](https://socialmock-project.firebaseapp.com)
-   [Firebase link 2](https://socialmock-project.web.app)
  ## Installation
To try this project locally, you will need:

- Nodejs
- Code editor (Visual Studio Code)
- Clone this repository from your code editor's console using the command:
```bash
  git clone https://github.com/herakle-dev/ntt-data-project-s2i
  ```
- Install the dependencies using the command:
```bash
  npm install
  ```
From the console, use the command:
```bash
  ng serve --open
  ```
## Main Dependencies
- @angular/animations
Version: ^15.2.0
The @angular/animations library provides support for animations within your Angular application. You can use it to add smooth and interactive animations to elements in your project.

- @angular/cdk
Version: ^15.2.9
@angular/cdk is Angular's Component Dev Kit (CDK). It provides a set of essential tools and components that can be used to create more complex and interactive Angular applications.

- @angular/common
Version: ^15.2.0
@angular/common is a core library of Angular that contains common functionality used throughout the framework.

- @angular/compiler
Version: ^15.2.0
The @angular/compiler library provides the Angular Just-in-Time (JIT) compiler, which analyzes the TypeScript code of your application and translates it into executable JavaScript code.

- @angular/core
Version: ^15.2.0
@angular/core is one of the core libraries of Angular and contains fundamental features of the framework, such as the module system, dependency injection system, and other basic functionalities.

- @angular/forms
Version: ^15.2.0
The @angular/forms library provides support for form handling within Angular applications, including validation of user-entered data.

- @angular/material
Version: ^15.2.9
@angular/material is a library that implements Google's Material Design for Angular. It provides a wide range of pre-built UI components such as buttons, modals, tables, and more, which can be used to create modern and intuitive user interfaces.

- @angular/platform-browser
Version: ^15.2.0
The @angular/platform-browser library contains Angular implementations specific to browsers, such as DOM rendering, event handling, and other browser runtime-related functionalities.

- @angular/platform-browser-dynamic
Version: ^15.2.0
@angular/platform-browser-dynamic provides support for compiling and dynamically executing Angular scripts within the browser. This library is used to bootstrap the Angular application in the browser.

- @angular/router
Version: ^15.2.0
The @angular/router library offers client-side routing for Angular applications. It allows you to effectively and manageably handle navigation between different views of the application.

- @fortawesome/fontawesome-svg-core
Version: ^6.4.0
@fortawesome/fontawesome-svg-core is a library that provides high-quality scalable vector icons (SVG) from the Font Awesome collection. You can use this library to add stylish icons to your Angular project.

- @fortawesome/free-solid-svg-icons
Version: ^6.4.0
The @fortawesome/free-solid-svg-icons library contains a wide range of solid vector icons from the Font Awesome collection. You can use these icons to enhance the appearance of your user interfaces.

- animate.css
Version: ^4.1.1
animate.css is a ready-to-use CSS animation library. It provides a collection of CSS classes that can be used to animate UI elements easily and quickly.

- bootstrap
Version: ^5.2.3
bootstrap is a popular CSS and JavaScript library for creating responsive and high-quality web interfaces. It is widely used for developing modern web applications.

- bootstrap-icons
Version: ^1.10.5
The bootstrap-icons library provides a wide range of high-quality SVG icons that can be used within your Angular project. The icons can be easily customized and adapted to your needs.

- ngx-bootstrap-icons
Version: ^1.9.2
ngx-bootstrap-icons is a library that simplifies the usage of Bootstrap icons within Angular applications. It provides Angular components that allow you to easily use Bootstrap icons in your templates.

- rxjs
Version: ~7.8.0
The rxjs library is a reactive programming library for JavaScript that provides support for asynchronous programming based on observables. It is widely used in Angular applications to handle reactive data streams.

- tslib
Version: ^2.5.3
tslib is a TypeScript library that provides various useful features such as type annotations support, utility functions, and more. It is often used as a dependency for TypeScript projects.

- zone.js
Version: ~0.12.0
zone.js is a library that provides a zone system for JavaScript. It is internally used by Angular for managing asynchronous events and the application lifecycle.

## Development Dependencies

- @angular-devkit/build-angular
Version: ^15.2.8
The @angular-devkit/build-angular library provides the necessary tools to build and deploy an Angular application. It also includes a set of plugins and configurations to facilitate the build process.

- @angular-eslint/builder
Version: 15.2.1
@angular-eslint/builder is an Angular-specific builder that enables static analysis of TypeScript code using ESLint.

- @angular-eslint/eslint-plugin
Version: 15.2.1
The @angular-eslint/eslint-plugin library is an ESLint plugin specifically for Angular that provides additional rules for static analysis of TypeScript code within Angular projects.

- @angular-eslint/eslint-plugin-template
Version: 15.2.1
@angular-eslint/eslint-plugin-template is an ESLint plugin specifically for Angular that provides rules for static analysis of HTML templates within Angular projects.

- @angular-eslint/schematics
Version: 15.2.1
The @angular-eslint/schematics library provides Angular-specific code schematics and generators that can be used with the Angular CLI to automate development tasks such as creating components, modules, and more.

- @angular-eslint/template-parser
Version: 15.2.1
@angular-eslint/template-parser is a parser for static analysis of HTML templates within Angular projects using ESLint.

- @angular/cli
Version: ~15.2.6
@angular/cli is the Angular Command Line Interface (CLI) that provides a command-line tool for creating, managing, and deploying Angular projects.

- @angular/compiler-cli
Version: ^15.2.0
The @angular/compiler-cli library provides the ahead-of-time (AOT) compiler for Angular, which allows compiling the Angular application into pre-executable JavaScript for improved performance.

- @types/jasmine
Version: ~4.3.0
@types/jasmine is a library that provides TypeScript type definitions for Jasmine, a popular testing framework for JavaScript.

- @typescript-eslint/eslint-plugin
Version: 5.48.2
The @typescript-eslint/eslint-plugin library is an ESLint plugin specifically for TypeScript that provides additional rules for static analysis of TypeScript code.

- @typescript-eslint/parser
Version: 5.48.2
@typescript-eslint/parser is a parser for static analysis of TypeScript code using ESLint. It converts TypeScript code into an Abstract Syntax Tree (AST) that can be analyzed by ESLint.

- eslint
Version: ^8.33.0
eslint is a code static analysis tool that helps identify potential issues or errors in JavaScript or TypeScript code.

- jasmine-core
Version: ~4.5.0
jasmine-core is the core library of Jasmine, a testing framework for JavaScript. It provides basic functionality for test execution.

- karma
Version: ~6.4.0
karma is a test runner for JavaScript that allows running tests in different browsers or execution environments. It is often used with Jasmine for unit testing.

- karma-chrome-launcher
Version: ~3.1.0
karma-chrome-launcher is a Karma plugin that allows running tests in Google Chrome browsers. It is one of the most commonly used plugins for Karma test execution.

- karma-coverage
Version: ~2.2.0
karma-coverage is a Karma plugin that enables generating code coverage reports during test execution. It provides information about the tested code portions and those not covered by tests.

- karma-jasmine
Version: ~5.1.0
karma-jasmine is a Karma plugin that allows running tests written using Jasmine as the testing framework.

- karma-jasmine-html-reporter
Version: ~2.0.0
karma-jasmine-html-reporter is a Karma plugin that generates a detailed HTML report on the execution of Jasmine tests. The report includes information about the executed tests, successes, and any errors or failures.

- typescript
Version: ~4.9.4
typescript is the primary programming language used in Angular. It is a superset of JavaScript that adds additional features such as static types and the latest ECMAScript features.

##  Required App Features:
- Login page to authenticate the user and the corresponding logout functionality.
- Main page that displays all system users, with the ability to choose the number of users to display. It also allows searching, creating new users, and deleting existing ones.
- Single user details page, where clicking on any user redirects to their profile. The profile displays all their posts, comments on posts, and allows creating new comments on existing posts.
- Post list page where all the system posts can be found, along with their respective comments. It provides the ability to create new posts on this page.
- Test coverage of at least 60%.
## Coverage Achieved:
- 81.35% Statements 371/456
- 70.83% Branches 34/48
- 72.84% Functions 110/151
- 82.35% Lines 350/425
  ## Screenshots
- Login page

![Login page](
screenshot/login.png
)

- Users Page

![User page](
screenshot/globalUser.png
)
- New user
![New user](
screenshot/newUser.png
)
- Single user profile 
![User details](
screenshot/userDetails.png
)

- New user post
![User details Form](
screenshot/usernewpost.png
)
- New comment
![UserComment](
screenshot/userComment.png
)
- Posts
![Global Post](
screenshot/globalPost.png
)
- Global Post comments
  
![Post comments](
   screenshot/globalPostComment.png
)
- New post 

![New post](
screenshot/newPostForm.png
)
- Dependencies graph

![Grafico dipendenze progetto](
documentation/dependencies.svg)
