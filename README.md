## Common Features

- Quick start
- Integrated eslint, prettier and husky
- Global Error & Response Handler
- Simple and Standard scaffolding
- Based on Typescript Syntax
- Simple & Global Enviroment Configuration
- Request/Response Encryption & Decryption Implementation
- Easily Add new feature
- Integrated winston Logger
- Follwed Production Ready Best Practices: Security
- Added only used npm modules
- Unit & Integration Test Cases


## Start The application in Development Mode

- Clone the Application `git clone https://github.com/stolbikova/backend_service.git`
- Install the dependencies `npm install`
- Start the application `npm run start:local`

## Start The application in Production Mode

- Install the dependencies `npm install`
- Create the build `npm run build`
- Start the application `npm run start:production`
- Before starting make sure to creat prod environment `.env.prod` file


## Project Structure

| Name                              | Description |
| --------------------------------- | ----------- |
| **src/**                          | Source files |
| **src/abstractions**              | Abstarct classes and Interfaces  |
| **src/api**                       | REST API Controllers & Models  |
| **src/environments**              | Application Environments Handling utility  |
| **src/lib**                       | Reusable utilises and library source code like a logger|
| **src/middleware/**               | Express Middlewares like error handler feature |
| **build/**                        | Compiled source files will be placed here |
| **tests/**                        | Test cases will be placed here |
| **tests/helpers/**                | Helpers for test cases will be placed here  |
| **tests/unit-tests/**             | Unit Test cases will be placed here  |
| **tests/integration-tests/**      | API routes (Integration) Test cases will be placed here|
| **mocks/**                        | mocks|
| **ви/**                           | data base connection


## Group API

- `${host}/api/group/:group/:id` - Post clicent instance POST, delete client instance DELETE
- `${host}/api/group/` - Return all groups GET
- `${host}/api/group/:group` - Return all instances for certain group GET
