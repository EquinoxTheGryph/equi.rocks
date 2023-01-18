# equirocks-website

The website for [equi.rocks](https://equi.rocks)

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

To run the production version:

```bash
npm run serve
```

This will use any enviroment variables as defined in the `/server/.env` file.
Any additional configuration variables can be found [here](https://github.com/sveltejs/kit/tree/master/packages/adapter-node#environment-variables) 

## Docker

```bash
docker build .
```

## Development notes
- mdi-svelte has no TS definitions, using custom definitions in app.d.ts