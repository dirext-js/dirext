/* eslint-disable class-methods-use-this */
/* eslint-disable no-continue */
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

  // a helper function that takes each segment of route and creates an array of key value pairs
  // edge case for global middleware
  routeSplitter(url) {
    console.log('the url in routeSplitter is:', url);
    if (url === '/' || url === '*' || url === 'global') return [{ route: url }];
    // split route on each / then map through elements
    const route = url.split('/').splice(1).map((elem) => {
      // if element is a param return an object with key param value elem
      if (elem[0] === ':') return { param: elem.slice(1) };
      // if element is a query string
      if (elem[0] === '?') {
        // split on & to seperate multiple queries
        const queryArr = elem.slice(1).split('&');
        // reduce query arr to an object holding key query which holds key value pairs of queries
        return queryArr.reduce((obj, query) => {
          if (!obj.query) obj.query = {};
          const split = query.split('=');
          obj.query[split[0]] = split[1];
          return obj;
        }, {});
      }
      // else return obj with key route and value of elem
      return { route: elem };
    });
    // return array of routes
    return route;
  }

  compareRoutes(currentRoute, splitRoute, loopLength) {
    for (let j = 0; j < loopLength; j += 1) {
      // confirm that all route segment objects hold the same value
      if (currentRoute.url[j].route && splitRoute[j].route) {
        if (currentRoute.url[j].route === splitRoute[j].route) {
          continue;
        } else {
          return false;
        }
      } else if (currentRoute.url[j].param && splitRoute[j].route) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  }

  // method to add routes for router to recognicse
  set(method, url, ...middlewareFuncs) {
    // array of middleware functions
    const middleware = [...middlewareFuncs];
    // push object with url, method, and middlware to routes
    this.routes.push({ url: this.routeSplitter(url), method, middleware });
    return this;
  }

  // method to add middleware to routes without specific http req method
  use(url, ...middlewareFuncs) {
    if (typeof url !== 'string') {
      middlewareFuncs = [url];
      url = 'global';
    }
    // array of middleware funcs
    const middleware = [...middlewareFuncs];
    console.log('the middleware in use is:', middleware);
    // push obect with url, method, and middleware to routes
    this.routes.push({ url: this.routeSplitter(url), method: '', middleware });
    return this;
  }

  // dirext.post('eli/)
  find(url, method) {
    // parse input route using routeSplitter helper function
    const splitRoute = this.routeSplitter(url);
    console.log('the split route is: ', splitRoute);
    // initialize empty array to push middleware to
    const middleware = [];

    // initialize loopLength variable
    let loopLength;
    // check if input route contains a query at the end
    if (splitRoute[splitRoute.length - 1].query) {
      loopLength = splitRoute.length - 1;
    } else {
      loopLength = splitRoute.length;
    }
    // check if the two arrays are the same length, if they aren't, continue with loop
    for (let i = 0; i < this.routes.length; i += 1) {
      const currentRoute = this.routes[i];
      // check if the route at i has a url of "global"
      console.log(`current route at index ${i} is ${JSON.stringify(currentRoute)}`);
      if (currentRoute.url[0].route === 'global') {
        console.log('in the global conditional pusherrrr line 110');
        // if it does, push it to the middleware
        middleware.push(...currentRoute.middleware);
      }
      // check if the route at index i has a method
      if (!currentRoute.method && currentRoute.url[0].route !== 'global') {
        // if there is no method, push middleware and break out of the loop
        middleware.push(...currentRoute.middleware);
        console.log('about to breakkkkkkk line 117');
        break;
      }
      // otherwise compare the length of the two routes
      if (currentRoute.url.length === loopLength && currentRoute.method === method) {
        // if they do match, push middleware to middleware array
        const match = this.compareRoutes(currentRoute, splitRoute, loopLength);
        if (match) middleware.push(...currentRoute.middleware);
      }
    }
    // console.log('the middleware array is: ', middleware);
    return middleware;
  }
}

module.exports = Dirext;
