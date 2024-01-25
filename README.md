# TakeHome

#### Node, Express, Typescript, Jest, Docker, Hexagonal Architecture, PostgreSQL

## Introduction

#### This is a version of the takehome project that runs a node.js project that uses hexagonal architecture with docker

## Installation and Usage

### Using Docker

1. **Clone the Repository**

    ```bash
    git clone git@github.com:andres-root/deel.git
    ```

2. **Build with Docker Compose**

    Navigate to the project directory:

    ```bash
    cd [Your Project Directory]
    ```

    Build the project using Docker Compose:

    ```bash
    docker compose build
    ```

3. **Run the Project**

    Run your project in detached mode:

    ```bash
    docker compose up -d
    ```

### Running Tests

To run tests, follow these steps:

1. **Install Dependencies**

    ```bash
    npm install
    ```

2. **Run Tests**

    ```bash
    npm run test
    ```

### Running locally Without Docker

To run the project without Docker, ensure the Docker backend instance is not running and that you are running a local PostgreSQL DB instance, then follow these steps:

1. **Install Dependencies**

    ```bash
    npm install
    ```

2. **Start the PostgreSQL Server**

    ```bash
    docker compose -f docker-compose-postgres.yaml up -d
    ```

    (this will also run the test database)

3. **Start the Development Server**

    ```bash
    npm run dev
    ```
