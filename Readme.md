# Sample nodejs project code

This is an _incomplete_ sample code for a nodejs project

### Technical specifications

1.  **nodejs** v10 [you can use *nvm* to set node version to v10.0.0]
2.  Testing with **moca** and coverage with **nyc** and load testing with **artillery**
3.  **SQLite** db
4.  CI/CD and deployment with **pm2**
5.  Logger using **winston**
6.  Linting with **eslint**
7.  Basic security with  **helmet** and **sql-injection** to prevent SQL injection attacks

### starting the app

1.  install packages: run `npm install` in the terminal in the root directory of the project
2.  start development server: run `npm run dev`
3.  start development server with linting forced: run `npm run dev:lint`
4.  to run existing tests: run `npm run test`
5.  to optain coverage: run `npm run test:coverage`
6.  to load test: run `npm run test:load` [make sure to set the appropriate url]
7.  to start production server: run `npm run prod`
