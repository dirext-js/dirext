class Dirext {
  constructor() {
    // an array of routes
    this.routes = [];

    // binding all HTTP req methods as methods on Dirext using bind and our set method
    this.get = this.set.bind(this, 'GET');
    this.post = this.set.bind(this, 'POST');
    this.put = this.set.bind(this, 'PUT');
    this.patch = this.set.bind(this, 'PATCH');
    this.delete = this.set.bind(this, 'DELETE');
    this.head = this.set.bind(this, 'HEAD');
    this.connect = this.set.bind(this, 'CONNECT');
    this.options = this.set.bind(this, 'OPTIONS');
    this.trace = this.set.bind(this, 'TRACE');
  }
  // create a helper function that takes each segment of route and creates an array of key value pairs
  // edge case for global middleware

  // method to add routes for router to recognicse
  set(method, url, ...middlewareFuncs) {
    // array of middleware functions
    const middleware = [...middlewareFuncs];
    // push object with url, method, and middlware to routes
    this.routes.push({ url, method, middleware });
    return this;
  }

  // method to add middleware to routes without specific http req method
  use(url, ...middlewareFuncs) {
    if (typeof url !== 'string') url = 'global';
    // array of middleware funcs
    const middleware = [...middlewareFuncs];
    // push obect with url, method, and middleware to routes
    this.routes.push({ url, method: '', middleware });
    return this;
  }

  // /ELI/izumi/kang  /get
  // dirext.use('/eli', someMiddleware)

  // dirext.post('eli/)
  find(url, method) {
    // helper function for slicing urls
    const helperSlice = (url) => {

    };
    // check if the two arrays are the same length, if they aren't, continue with loop
    // confirm that all route segment objects hold the same value
    // if there is a parameter in the url stored in routes, the value at that index doesn't matter
    // if they do match, push middleware to middleware array
    // if we find a route with a global url before we find our matching route, push that middleware to array
    const middleware = [];
    for (let i = 0; i < this.routes.length; i += 1) {
      const current = this.routes[i];
    }
  }
}

module.exports = Dirext;
