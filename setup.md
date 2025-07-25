# Build a React App from Scratch

https://react.dev/learn/build-a-react-app-from-scratch


1. Vite 
```
npm create vite@latest front-end-trade-sphere -- --template react
```

```
cd front-end-trade-sphere
npm install
npm run dev
```


https://reactrouter.com/start/declarative/installation


??? What to install next

Next install React Router from npm:
```
npm i react-router
```

Resources for React Router:

https://reactrouter.com/start/declarative/routing

Resource for React Outlet:
https://api.reactrouter.com/v7/functions/react_router.Outlet.html


Resouces for React Link:
https://api.reactrouter.com/v7/functions/react_router.Link.html


Resouces for React useLocation:
https://reactrouter.com/api/hooks/useLocation


Resources for React createContext:

https://react.dev/reference/react/createContext


# Install axios
```
npm install axios
```

# Need to figures out axios call issue

```
login:1 Access to XMLHttpRequest at 'https://back-end-trade-sphere.onrender.com/users/login' from origin 'http://localhost:5173' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.Understand this error
Login.jsx:25 AxiosError {message: 'Network Error', name: 'AxiosError', code: 'ERR_NETWORK', config: {…}, request: XMLHttpRequest, …}code: "ERR_NETWORK"config: {transitional: {…}, adapter: Array(3), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}message: "Network Error"name: "AxiosError"request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}stack: "AxiosError: Network Error\n    at XMLHttpRequest.handleError (http://localhost:5173/node_modules/.vite/deps/axios.js?v=733aac55:1615:14)\n    at Axios.request (http://localhost:5173/node_modules/.vite/deps/axios.js?v=733aac55:2143:41)\n    at async handleSubmit (http://localhost:5173/src/pages/Login.jsx:43:7)"[[Prototype]]: Error
Login.jsx:26 Login failed: AxiosError {message: 'Network Error', name: 'AxiosError', code: 'ERR_NETWORK', config: {…}, request: XMLHttpRequest, …}
Login.jsx:18  POST https://back-end-trade-sphere.onrender.com/users/login net::ERR_FAILED -->
```