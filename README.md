# Tasks API

![GitHub](https://img.shields.io/github/license/EvandroFBL/tasks-api?style=for-the-badge) ![GitHub last commit](https://img.shields.io/github/last-commit/EvandroFBL/tasks-api?style=for-the-badge) ![GitHub top language](https://img.shields.io/github/languages/top/EvandroFBL/tasks-api?style=for-the-badge)
API with no use of frameworks for the management of tasks. Challenge one from Node trail of the Rocketseat's Ignite Journey.
Download and import the [Insomnia File](insomnia_tasks_api.json) for making the API calls.

## Features

- Create a Task.
- List all tasks.
- Update a task by 'id'.
- Remove a task by 'id'.
- Toggle complete or incomplete the task by 'id'.
- Import tasks from a CSV file.
 
## Routes

- **GET** - */tasks*
-- For getting all the tasks.
-- Accept query params (title and description) for filtering.
- **POST** - */tasks*
-- For creating a task.
- **PUT** - */tasks/:id*
-- For updating a task.
- **PATCH** - */tasks/:id/complete*
-- For toggling the complete status of a task.
- **DELETE** - */tasks/:id*
-- For deleting a task.

## Tech

- [NodeJs](https://nodejs.org/)
- [csv-parser](https://csv.js.org/)

## Installation

Get to the project folder and run
```sh
cd tasks-api
npm i
```

## Running

Running the API
```sh
cd tasks-api
npm run dev
```

Import the tasks from a CSV file

```sh
cd tasks-api
npm run importCsv
```
**Observations:** 
- the CSV file must be in the /tasks-api/import/ folder
- There's already an example in the folder