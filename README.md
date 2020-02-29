![DirextLogo](https://i.ibb.co/3CCS8g5/dirextlogo.png)

 🚧 A lightweight routing solution for Node.js. 🚧

## **Install dirext** 
`  npm i dirext-js`

Initialize a new instance of dirext.

```javascript
const Dirext = require('dirext-js');
const app = new Dirext();
```

## Setting routes

Syntax in `dirext` is similar to Express. 

### method
Any uppercase valid HTTP method:
* GET
* POST
* PUT
* PATCH
* DELETE
* HEAD
* CONNECT
* OPTIONS
* TRACE

### url
Any endpoint. Dirext supports:
* static - `/home`
* parameters - `/home/:user`
* nested parameters - `/home/:user/posts/:id`
* queries - `/home/?user`
* wildcards - `/home/*`


#### dirext.set(method, url, [...middleware])
Initializes a route based on a specific **method**. Returns itself.

```javascript
app.set('GET', '/home', middlewareFunction, middlewareFunctionTwo);
app.set('POST', '/home', middlewareFunctionThree, middlewareFunctionFour);
```

#### dirext.use(url, [...middleware])

Initializes a route with middleware to execute regardless of the method. If no url is provided, it will be set as global middlware. Returns itself.

```javascript
app.use('/', middlewareFunction);
app.use(globalMiddlewareFunction);
```

#### dirext.METHOD(url, [...middleware])

Utilizes dirext's own `set` method to set a method-specific route without passing in method as an argument. Returns itself.

```javascript
app.get('/home', middlewareFunction);
app.post('/home/:user', userMiddlewareFunction);
app.delete('/home/:user/posts/:id', deletePostMiddleware);
```

#### dirext.find(method, url)

Finds all stored route-specific and global middleware, parameters, and queries, for a route. Returns an object with **middleware, params, and queries**.
> Middleware will be returned in an array **_in the order it was defined_**. Queries and Params will be returned in objects with key/value pairs. 

```javascript
app.use(globalMiddleware);
app.use('/home', homeMiddleware);
app.get('/home', getHomeMiddleware);
app.post('/home/:user', postUserMiddleware);
app.delete('/home/?user=user1/posts/:id', deleteMiddleware);

app.find('GET', '/home');
// -> { middleware: [globalMiddleware, homeMiddleware, getHomeMiddleware] }

app.find('POST', '/home/user1');
// -> { middleware: [globalMiddleware, postUserMiddleware], params: { user: user1 } }

app.find('DELETE', '/home/?user=user1/posts/2');
// -> { middleware: [globalMiddleware, deleteMiddleware], params: { id: 2 }, queries: { user: user1 } }
```

### Creators 

[Sara Powers](https://github.com/sarapowers)

[Eli Gallipoli](https://github.com/egcg317)

[Izumi Sato](https://github.com/izumi411)

[Alex Kang](https://github.com/akang0408)





