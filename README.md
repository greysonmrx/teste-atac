# Teste - Atac

## :memo: Getting started

**Clone the project and access the folder**

```bash
$ git clone https://github.com/greysonmrx/teste-atac.git
$ cd teste-atac
```

## Backend

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- One instance of [PostgreSQL](https://www.postgresql.org/)

> Obs.: I recommend use docker

**Follow the steps below**

```bash
# Access the folder
cd backend

# Install the dependencies
$ yarn

# Make a copy of '.env.example' to '.env'
$ cp .env.example .env

# Create the instance of postgreSQL using docker
$ docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

# Start container
$ docker start postgres

# Now you need to create two databases: teste-atac and teste-atac-tests

# Once the services are running, run the migrations
$ yarn typeorm migration:run

# Run the tests
$ yarn test

# To finish, run the api service
$ yarn dev

# Well done, project is started!
```

## Frontend

### Requirements

- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- Backend are running

**Follow the steps below**

```bash
# Access the folder
$ cd frontend

# Install the dependencies
$ yarn

# Start the application
$ yarn start

# Well done, project is started!
```
