# Angular 2 + Semantic UI Starter

__Work in Progress__
Starter pack for all-in-one applications - a simple todo-list application
build using Angular 2, Semantic UI and without any server-side page rendering.

## Architecture Overview
This example application performs all rendering and presentation work at
client side via Angular 2. State is loaded and persisted to the REST API,
so when you reload the page in your browser you'll see the same state.

The application leverages the swagger-servie-skeleton project to power the
REST interface, which can be viewed at:

  - http://localhost:10010/docs/


In a real-world application you'd likely split the serving of static
content from the REST API, but for the purposes of this application
everything is combined.

## Installation
The installation/startup steps are:

  - Clone Repository
  - npm install
  - npm start

The NPM install steps will compile the pre-canned Semantic-UI files. You
can also rebuild this content on command via `gulp` or `gulp build`.

## More Details
The source locations are:

 - /client (Raw ES6 client-side code)
 - /contracts (REST API Service Contract)
 - /public
    - /static (Static content)
    - /thirdparty
        - /semantic (Semantic UI installation path)
 - /src (Server side code)
    - /controllers (REST API Controllers)
    - /services (Back-end services for REST API)
    