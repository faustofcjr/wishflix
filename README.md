# Wishflix

An awesome wishlist of movies frontend using [Vue.js](https://vuejs.org/).

## Prerequisites

- Node 12 or greater;
- Docker and Docker Compose;

Note: We can use either solution to run this project in development environment and code hot-reloading.

**Instalation Guides:**

- [Node](https://nodejs.org/en/download/package-manager/)
- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project setup

Get the code by either cloning this repository using git.

```bash
git clone https://github.com/faustofcjr/wishflix.git
```

or [downloading source](https://github.com/faustofcjr/wishflix/archive/main.zip) code as a zip archive.

In the command prompt, go to project's root directory and follow one of the steps below (Node or Docker) to run Wishflix in the development environment.

### Using Node

```bash
npm install
```

**Compiles and hot-reloads for development:**

```bash
npm run serve
```

Check the terminal output to identify the host and port where the web app is running. Usually Vue app runs on *8080* port, if it isn't already being used.

### Using Docker

```bash
docker-compose up -d --build
```

To simplify even more, there is a Makefile with the main compose docker commands. On terminal, run *make* for more detail.

**Compiles and hot-reloads for development:**

 The service exposes the wishflix-web on port 8080, however, we can identify which port is being used through the command *docker container ls*

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).