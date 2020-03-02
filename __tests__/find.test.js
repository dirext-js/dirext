const Dirext = require('../index.js');

const router = new Dirext();

test('if corresponding url and method that is passed into find method exist in router.routes, return { middleware: [ <...middleware funcs>], params: { <param> : <route> } }', () => {
  const middleware1 = () => 'testing1';
  const middleware2 = () => 'testing2';
  const middleware3 = () => 'testing3';
  const middleware4 = () => 'testing4';

  router.set('GET', '/home/user', middleware1);
  router.set('POST', '/home/:posts/images', middleware1, middleware2);
  router.set('DELETE', '/interface/user/address', middleware1, middleware3);
  router.set('PUT', '/interface/:posts/images', middleware2, middleware4);
  router.set('PATCH', '/home/users/images', middleware2, middleware3, middleware4);
  router.set('HEAD', '/home/users/portfolio/pictures', middleware1, middleware2, middleware4);
  router.set('CONNECT', '/home/:users/data', middleware1);
  router.set('OPTIONS', '/interface/home/portfolio/pictures', middleware2, middleware4);
  router.set('TRACE', '/home/:users/:portfolios/pictures', middleware1, middleware2, middleware3, middleware4);

  expect(router.find('GET', '/home/user')).toEqual({ middleware: [middleware1], params: {} });
  expect(router.find('POST', '/home/post1/images')).toEqual({ middleware: [middleware1, middleware2], params: { posts: 'post1' } });
  expect(router.find('DELETE', '/interface/user/address')).toEqual({ middleware: [middleware1, middleware3], params: {} });
  expect(router.find('PUT', '/interface/post1/images')).toEqual({ middleware: [middleware2, middleware4], params: { posts: 'post1' } });
  expect(router.find('PATCH', '/home/users/images')).toEqual({ middleware: [middleware2, middleware3, middleware4], params: {} });
  expect(router.find('HEAD', '/home/users/portfolio/pictures')).toEqual({ middleware: [middleware1, middleware2, middleware4], params: {} });
  expect(router.find('CONNECT', '/home/user1/data')).toEqual({ middleware: [middleware1], params: { users: 'user1' } });
  expect(router.find('OPTIONS', '/interface/home/portfolio/pictures')).toEqual({ middleware: [middleware2, middleware4], params: {} });
  expect(router.find('TRACE', '/home/user1/portfolio1/pictures')).toEqual({ middleware: [middleware1, middleware2, middleware3, middleware4], params: { users: 'user1', portfolios: 'portfolio1' } });
});

test('if corresponding url and method that is passed into find method does not exist in router.routes, return { middleware: [], params: {} }', () => {
  const middleware1 = () => 'testing1';
  const middleware2 = () => 'testing2';
  const middleware3 = () => 'testing3';
  const middleware4 = () => 'testing4';

  router.set('GET', '/home/user', middleware1);
  router.set('POST', '/home/:posts/images', middleware1, middleware2);
  router.set('DELETE', '/interface/user/address', middleware1, middleware3);
  router.set('PUT', '/interface/:posts/images', middleware2, middleware4);
  router.set('PATCH', '/home/users/images', middleware2, middleware3, middleware4);
  router.set('HEAD', '/home/users/portfolio/pictures', middleware1, middleware2, middleware4);
  router.set('CONNECT', '/home/:users/data', middleware1);
  router.set('OPTIONS', '/interface/home/portfolio/pictures', middleware2, middleware4);
  router.set('TRACE', '/home/:users/:portfolios/pictures', middleware1, middleware2, middleware3, middleware4);

  expect(router.find('GET', '/home/testing')).toEqual({ middleware: [], params: {} });
  expect(router.find('POST', '/home/testing/testing')).toEqual({ middleware: [], params: {} });
  expect(router.find('DELETE', '/interface/user/testing')).toEqual({ middleware: [], params: {} });
  expect(router.find('PUT', '/interface/testing/testing')).toEqual({ middleware: [], params: {} });
  expect(router.find('PATCH', '/home/testing/images')).toEqual({ middleware: [], params: {} });
  expect(router.find('HEAD', '/home/users/testing/pictures')).toEqual({ middleware: [], params: {} });
  expect(router.find('CONNECT', '/home/testing/testing')).toEqual({ middleware: [], params: {} });
  expect(router.find('OPTIONS', '/interface/testing/portfolio/pictures')).toEqual({ middleware: [], params: {} });
  expect(router.find('TRACE', '/home/user1/testing/testing')).toEqual({ middleware: [], params: {} });
});
