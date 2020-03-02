const Dirext = require('../index.js');

const router = new Dirext();

test('input method, url, and middlewareFuncs as args and check to see that correct obj has been pushed into this.routes array', () => {
  const middleware1 = () => 'testing1';
  const middleware2 = () => 'testing2';
  const middleware3 = () => 'testing3';
  const middleware4 = () => 'testing4';

  router.set('GET', '/home/user', middleware1);
  expect(router.routes[router.routes.length - 1]).toEqual(
    {
      url: [{ route: 'home' }, { route: 'user' }],
      method: 'GET',
      middleware: [middleware1],
    },
  );
  router.set('POST', '/home/posts/images', middleware1, middleware2);
  expect(router.routes[router.routes.length - 1]).toEqual(
    {
      url: [{ route: 'home' }, { route: 'posts' }, { route: 'images' }],
      method: 'POST',
      middleware: [middleware1, middleware2],
    },
  );
  router.set('DELETE', '/interface/user/address', middleware1, middleware3);
  expect(router.routes[router.routes.length - 1]).toEqual(
    {
      url: [{ route: 'interface' }, { route: 'user' }, { route: 'address' }],
      method: 'DELETE',
      middleware: [middleware1, middleware3],
    },
  );
  router.set('PUT', '/interface/posts/images', middleware2, middleware4);
  expect(router.routes[router.routes.length - 1]).toEqual(
    {
      url: [{ route: 'interface' }, { route: 'posts' }, { route: 'images' }],
      method: 'PUT',
      middleware: [middleware2, middleware4],
    },
  );
  router.set('PATCH', '/home/users/images', middleware2, middleware3, middleware4);
  expect(router.routes[router.routes.length - 1]).toEqual(
    {
      url: [{ route: 'home' }, { route: 'users' }, { route: 'images' }],
      method: 'PATCH',
      middleware: [middleware2, middleware3, middleware4],
    },
  );
  router.set('HEAD', '/home/users/portfolio/pictures', middleware1, middleware2, middleware4);
  expect(router.routes[router.routes.length - 1]).toEqual(
    {
      url: [{ route: 'home' }, { route: 'users' }, { route: 'portfolio' }, { route: 'pictures' }],
      method: 'HEAD',
      middleware: [middleware1, middleware2, middleware4],
    },
  );
  router.set('CONNECT', '/home/users/data', middleware1 );
  expect(router.routes[router.routes.length - 1]).toEqual(
    {
      url: [{ route: 'home' }, { route: 'users' }, { route: 'data' }],
      method: 'CONNECT',
      middleware: [middleware1],
    },
  );
  router.set('OPTIONS', '/interface/home/portfolio/pictures', middleware2, middleware4);
  expect(router.routes[router.routes.length - 1]).toEqual(
    {
      url: [{ route: 'interface' }, { route: 'home' }, { route: 'portfolio' }, { route: 'pictures' }],
      method: 'OPTIONS',
      middleware: [middleware2, middleware4],
    },
  );
  router.set('TRACE', '/home/users/portfolio/pictures', middleware1, middleware2, middleware3, middleware4);
  expect(router.routes[router.routes.length - 1]).toEqual(
    {
      url: [{ route: 'home' }, { route: 'users' }, { route: 'portfolio' }, { route: 'pictures' }],
      method: 'TRACE',
      middleware: [middleware1, middleware2, middleware3, middleware4],
    },
  );
});
