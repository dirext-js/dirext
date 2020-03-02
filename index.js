
var __assign = (this && this.__assign) || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (const p in s) { if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]; }
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
const __spreadArrays = (this && this.__spreadArrays) || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (let a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
};
exports.__esModule = true;
/* eslint-disable class-methods-use-this */
/* eslint-disable no-continue */
const Dirext = /** @class */ (function () {
  function Dirext() {
    // an array of routes
    this.routes = [];
    // binding all HTTP req methods as methods on Dirext using bind and our set method
    this.get = this.set.bind(null, 'GET');
    this.post = this.set.bind(null, 'POST');
    this.put = this.set.bind(null, 'PUT');
    this.patch = this.set.bind(null, 'PATCH');
    this.delete = this.set.bind(null, 'DELETE');
    this.head = this.set.bind(null, 'HEAD');
    this.connect = this.set.bind(null, 'CONNECT');
    this.options = this.set.bind(null, 'OPTIONS');
    this.trace = this.set.bind(null, 'TRACE');
  }
  // a helper function that takes each segment of route and creates an array of key value pairs
  // edge case for global middleware
  Dirext.prototype.routeSplitter = function (url) {
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
  };
  Dirext.prototype.compareRoutes = function (currentRoute, splitRoute, loopLength) {
    let _a;
    const response = {
      match: true,
    };
    for (let j = 0; j < loopLength; j += 1) {
      // confirm that all route segment objects hold the same value
      if (currentRoute.url[j].route && splitRoute[j].route) {
        if (currentRoute.url[j].route === splitRoute[j].route) {
          continue;
        } else if (currentRoute.url[j].route === '*' && splitRoute[j].route !== undefined) {
          return response;
        } else {
          response.match = false;
          return response;
        }
      } else if (currentRoute.url[j].param && splitRoute[j].route) {
        // if there is a param in url route, save variable and value to params obj
        const variable = currentRoute.url[j].param;
        const value = splitRoute[j].route;
        splitRoute[j].params = (_a = {}, _a[variable] = value, _a);
        if (!response.params) response.params = {};
        response.params[variable] = value;
        // delete route obj now that we know it's a param
        delete splitRoute[j].route;
        // store new param object on response
        continue;
        // logic for handling wildcard routes
      } else {
        response.match = false;
        return response;
      }
    }
    return response;
  };
  // method to add routes for router to recognize
  Dirext.prototype.set = function (method, url) {
    const middlewareFuncs = [];
    for (let _i = 2; _i < arguments.length; _i++) {
      middlewareFuncs[_i - 2] = arguments[_i];
    }
    // array of middleware functions
    const middleware = __spreadArrays(middlewareFuncs);
    // push object with url, method, and middlware to routes
    this.routes.push({ url: this.routeSplitter(url), method, middleware });
    return this;
  };
  // method to add middleware to routes without specific http req method
  Dirext.prototype.use = function (url) {
    let middlewareFuncs = [];
    for (let _i = 1; _i < arguments.length; _i++) {
      middlewareFuncs[_i - 1] = arguments[_i];
    }
    if (typeof url !== 'string') {
      middlewareFuncs = __spreadArrays([url], middlewareFuncs);
      url = 'global';
    }
    // array of middleware funcs
    const middleware = __spreadArrays(middlewareFuncs);
    // push obect with url, method, and middleware to routes
    this.routes.push({ url: this.routeSplitter(url), method: '', middleware });
    return this;
  };
  Dirext.prototype.find = function (method, url) {
    let _a; let _b; let _c; let
      _d;
    // parse input route using routeSplitter helper function
    const splitRoute = this.routeSplitter(url);
    // initialize empty array to push middleware to
    const response = {
      middleware: [],
      params: {},
    };
    // initialize loopLength variable
    let loopLength;
    // check if input route contains a query at the end
    if (splitRoute[splitRoute.length - 1].query) {
      // assign query object to response object
      response.query = splitRoute[splitRoute.length - 1].query;
      // don't compare last obj in route array
      loopLength = splitRoute.length - 1;
    } else {
      loopLength = splitRoute.length;
    }
    for (let i = 0; i < this.routes.length; i += 1) {
      const currentRoute = this.routes[i];
      // check if the route at i has a url of "global"
      if (currentRoute.url[0].route === 'global') {
        // if it does, push it to the middleware
        (_a = response.middleware).push.apply(_a, currentRoute.middleware);
      }
      // check if the route at index i has a method
      else if (!currentRoute.method) {
        // if there is no method, push middleware and break out of the loop
        (_b = response.middleware).push.apply(_b, currentRoute.middleware);
        break;
      }
      // otherwise compare the length of the two routes
      else if (currentRoute.url.length === loopLength && currentRoute.method === method) {
        // if they do match, push middleware to middleware array
        var result = this.compareRoutes(currentRoute, splitRoute, loopLength); // set default parameter for loop length? don't use it if it's a wildcard?
        if (result.match) {
          (_c = response.middleware).push.apply(_c, currentRoute.middleware);
          if (result.params) response.params = { ...result.params };
        }
      } else if (currentRoute.method === method) {
        // loop through currentRoute and compare each index with splitRoute
        var result = this.compareRoutes(currentRoute, splitRoute, loopLength);
        if (result.match) {
          (_d = response.middleware).push.apply(_d, currentRoute.middleware);
          if (result.params) response.params = { ...result.params };
        }
      }
    }
    return response;
  };
  return Dirext;
}());

const hoidy = new Dirext()
const middleware1 = () => 'testing1';
const middleware2 = () => 'testing2';
const middleware3 = () => 'testing3';
const middleware4 = () => 'testing4';
hoidy.set('GET', '/hoidy/:hi', middleware1, middleware2)
console.log(hoidy.routes);
console.log(hoidy.find('GET', '/hi/testing'));


module.exports = Dirext;
