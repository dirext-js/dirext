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
console.log(routeSplitter('/home/posts/*'));
