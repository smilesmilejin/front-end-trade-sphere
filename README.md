# One-time Project Setup - Front-End Layer

Follow these directions once at the beginning of your project:


## Clone

Clone the forked repo. Do _not_ clone this inside of another project folder, because that will cause issues.

Replace <your-forked-repo-url> with the URL of your forked repo, and <repo-folder> with the directory name created by the clone command.

```
$ git clone <your-forked-repo-url>
```

```
$ cd <repo-folder>
```

## Scaffold the App

Create a new React app within this project folder. **You must perform this within this front-end project folder**.

```bash
$ npm create vite@latest . -- --template react
```

## Add `axios`

Install axios:

```bash
$ npm install axios@latest
```

## Creating a `.env` File in root folder

Create a file named `.env`.

The front-end layer needs to send API requests to the back-end layer. In order to handle this, the front-end layer repo **must** include a `.env` file with this line:

```
VITE_APP_BACKEND_URL=http://localhost:5000
```

Note that this `VITE_APP_BACKEND_URL` _must_ include `http://`.

Use this environment variable to send your API requests. You can read it by using the expression `import.meta.env.VITE_APP_BACKEND_URL`. For example, we may use it like this in any component:

```js
const VITE_APP_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL

axios.get(`${VITE_APP_BACKEND_URL}/boards`, {
    // ...
```

This will make Render deployment easier.

## Commit and Push

Commit and push your files to your repo, especially including the `package.json` file!