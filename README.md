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

## Install Dependencies

Run the following command to install all necessary project dependencies:

```bash
$ npm install
```



## Register an Account on Cloudinary

1. Visit [Cloudinary](https://cloudinary.com) and sign up for a free account.
2. Once logged in, navigate to your Dashboard.
3. Locate and copy your Cloud Name — you’ll need this to configure the app.



## Creating a `.env` File in root folder

Create a file named `.env`.

### Backend API URL
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

### Cloudinary Configuration
The front-end uses the Cloudinary Upload Widget to upload images and retrieve their URLs. To enable this, the front-end repository must include a .env file containing the following line:

Replace <your-cloudinary-cloud-name> with your actual Cloudinary cloud name, which you can find in your Cloudinary dashboard.

```
VITE_CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
```


## Commit and Push

Commit and push your files to your repo, especially including the `package.json` file!


## Run the Program
Start the development server. The app will be available at http://localhost:5173/.
```
$ npm run dev
```