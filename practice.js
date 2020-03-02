


function routeSplitter(url) {
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


function compareRoutes(currentRoute, splitRoute, loopLength) {
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
}
// method to add routes for router to recognize
console.log(
  routeSplitter('/home/user/posts')
)




