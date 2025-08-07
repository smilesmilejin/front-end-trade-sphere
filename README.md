# TradeSphere - Capstone Front-end

## Introduction

TradeSphere is a community-driven web application designed to help people locally buy, sell, or trade items such as electronics, clothes, furniture, and more. It aims to make trading simple and accessible within local neighborhoods.

### Features
- User registration and login with email  
- Users can edit their profile  
- Ability to list new items for sale  
- Listings include details: name, category, description, price, location, pictures, and contact information  
- Users can update listing details (change name, description, add pictures)  
- Users can mark items as sold or no longer needed, or delete listings  
- Users can add favorites and view them in their profile  
- Filter items by category, availability, price, and date added  
- Users can search listings by keywords  
- Click on items to view detailed information  


## Dependencies

This project uses the following main dependencies:

#### Runtime Dependencies

- **react** — Front-end UI library  
- **react-dom** — React DOM rendering  
- **react-router** — Routing library for React  
- **axios** — HTTP client for API requests  
- **@cloudinary/url-gen** — Cloudinary URL generation for image management  
- **prop-types** — Runtime type checking for React props  

#### Development Dependencies

- **vite** — Build tool and development server  
- **@vitejs/plugin-react** — Vite plugin for React support  
- **eslint** and related plugins — JavaScript and React linting tools  
- **@types/react** and **@types/react-dom** — TypeScript type definitions (if using TypeScript)  


## One-time Project Setup - Front-End Layer

To get started with your project, follow these instructions:


### Clone

Replace <your-forked-repo-url> with the URL of your forked repo, and <repo-folder> with the directory name created by the clone command.

```
$ git clone <your-forked-repo-url>
```

```
$ cd <repo-folder>
```

### Install Dependencies

Run the following command to install all necessary project dependencies:

```bash
$ npm install
```


### Register an Account on Cloudinary

1. Visit [Cloudinary](https://cloudinary.com) and sign up for a free account.
2. Once logged in, navigate to your Dashboard.
3. Locate and copy your Cloud Name — you’ll need this to configure the app.



### Creating a `.env` File in root folder

Create a file named `.env`.

#### Backend API URL
To connect the front-end to the back-end, the front-end layer repo **must** include a `.env` file with this line:

```
VITE_APP_BACKEND_URL=http://localhost:5000
```

Use this environment variable to send your API requests.

Access this URL in your code with `import.meta.env.VITE_APP_BACKEND_URL`.


#### Cloudinary Configuration
The front-end uses the Cloudinary Upload Widget to upload images and retrieve their URLs. To enable this, the front-end repository must include a .env file containing the following line:

Replace <your-cloudinary-cloud-name> with your actual Cloudinary cloud name, which you can find in your Cloudinary dashboard.

```
VITE_CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
```


### Run the Program
Start the development server. The app will be available at http://localhost:5173/.
```
$ npm run dev
```