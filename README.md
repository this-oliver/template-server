# Backend Template

> This template is still a work in progress.

This is a backend template for a REST API that provides a basic CRUD functionality for a personal todo list application with user authentication. It has the following components:

- Data Models (Mongoose)
- Middleware and Routing (Express)
- Authentication (custom)
- Testing (Mocha, Chai, Supertest)

## Usage

You can use this template to quickly create a backend for your own application. To get started, you can clone this repository (with a clean git history) as follows:

```bash
# clone repo without git history
npx degit <repo-url> <project-name>

# enter project directory
cd <project-name>

# install dependencies
npm install

# start server in development mode
npm run dev
```

This will create a new directory called `<project-name>` with the contents of this repository (except for the `.git` directory). In other words, it allows you to start with a clean git history (i.e. no commits).

## Directory Structure

The goal is to create a lean and modular backend that is easy to understand and extend. That being said, the structure has been designed for my own personal use and may not be suitable for all use cases.

You can find a description of each subdirectory in the respective README.md file in the subdirectory.
