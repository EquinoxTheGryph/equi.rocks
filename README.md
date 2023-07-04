# equirocks-website

The website for [equi.rocks](https://equi.rocks)!

## Developing

> This project is made using VSCode. Installing the recommended extensions is, well, recommended.

-   Prepare the environment
    -   **On Nix(OS)**
        -   Enter the environment: `nix-shell`
            > This should get the database up and running
            > as well as having the requirements installed
    -   **Any other way**
        -   Make sure to install and get postgres up and running
            > This can also be done with a simple docker container!
        -   Install the packages: `npm install`
        -   Initialize the database: `npm run init`
-   Create an `.env` file and follow the example inside `.env.example`
-   Run the project: `npm run dev`
-   Have fun!

## Building and serving using Docker

> Make sure the `.env` file is set up correctly

Build the project and run the stack

```bash
docker compose up -d --build
```

To stop the stack

```bash
docker compose stop # Or down
```

## Building and serving (Vanilla, untested)

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

To run the production version:

```bash
npm run serve
```

This will use any enviroment variables as defined in the `.env` file.
Any additional configuration variables can be found [here](https://github.com/sveltejs/kit/tree/master/packages/adapter-node#environment-variables)

## Development notes

-   mdi-svelte has no TS definitions, using custom definitions in app.d.ts
