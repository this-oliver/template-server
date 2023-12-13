# Documentation

The goal is to create a lean and modular backend that is easy to understand, build on and extend. That being said, the structure has been designed for my own personal use and may not be suitable for all use cases.

```md
.
└── `src/`
    ├── `config/`
    ├── `data/`
    ├── `middleware/`
    ├── `router/`
    ├── `types/`
    └── `utils/`
```

## `src/`

This is the main directory for source code. It contains three key files:

- `index.ts`: entry point for the application. This file is responsible for connecting to the database and starting the server.
- `database.ts`: database connection logic. This file is responsible for connecting to the database and loading data models.
- `app.ts`: application logic. This file is responsible for loading middleware and routes, and starting the server.

### `config/`

This directory contains configuration files for the application.

### `data/`

This directory contains [mongoose](https://mongoosejs.com) data models and associated logic which are used to interact with the database. The models and logic are bundled together in a single file for each resource (e.g. `user.ts`).

### `middleware/`

This directory contains middleware functions which are essentially request handlers (i.e. `function(req, res, next)`) that can be used in routes. These functions are not bundled with routes because they can be reused in multiple routes and are easier to test in isolation.

### `router/`

This directory contains route definitions for application resources (e.g. `POST /users`).

### `types/`

This directory contains type definitions for the application. It is split into two subdirectories:

- `infrastructure.ts`: type definitions for infrastructure objects like errors and request objects.
- `logic.ts`: type definitions for application objects like data models and middleware functions.

### `utils/`

This directory contains utility modules for common, non-business tasks like uploading files to a bucket or generating cryptographic tokens.
