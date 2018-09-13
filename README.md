## Demo

[Brainhub-job-interview-assigment](https://quiet-plateau-48610.herokuapp.com)

## Description

Brainhub-job-interview-assigment is a small web application based on REST API that alows user to send his personal data such as:

- firstname
- lastname
- email
- year

After sending, the data is stored in Mongo Database.

## Prerequisites

`nodejs: ^8.11.3`
`mongo: ^3.6.3`

## Instalation

```sh
git clone git@github.com:ErnestZiemkowski/brainhub-job-interview-assigment.git
cd brainhub-job-interview-assigment/
npm install
cd client/
npm install
```

## Run app locally

Go back to the root directory of expenses-manager

```sh
npm start
```

Than in another terminal window

```sh
npm run client
```
## Run test

Open terminal and head to the test/ directory. Then type:
```sh
npm test
```

## Stack & Tools

- mongoDB
- mongoose
- express.js
- react.js
- node.js
- mocha.js