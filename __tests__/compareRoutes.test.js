const Dirext = require('../index.js');

const router = new Dirext();

test('input parameters that contain static routes and return { match: true } if they match', () => {
  expect(router.compareRoutes({ url: [{ route: 'testing' }, { route: 'jest' }], method: 'GET', middleware: [] }, [{ route: 'testing' }, { route: 'jest' }], 2)).toEqual({ match: true });
  expect(router.compareRoutes({ url: [{ route: 'home' }, { route: 'user1' }, { route: 'posts' }], method: 'GET', middleware: [] }, [{ route: 'home' }, { route: 'user1' }, { route: 'posts' }], 3)).toEqual({ match: true });
  expect(router.compareRoutes({ url: [{ route: 'home' }, { route: 'profile' }, { route: 'data' }, { route: 'address' }], method: 'GET', middleware: [] }, [{ route: 'home' }, { route: 'profile' }, { route: 'data' }, { route: 'address' }], 4)).toEqual({ match: true });
  expect(router.compareRoutes({ url: [{ route: 'interface' }, { route: 'user1' }, { route: 'images' }, { route: 'pic1' }], method: 'GET', middleware: [] }, [{ route: 'interface' }, { route: 'user1' }, { route: 'images' }, { route: 'pic1' }], 4)).toEqual({ match: true });
});

test('input parameters that contain static routes and return { match: false } if they do not match', () => {
  expect(router.compareRoutes({ url: [{ route: 'testing' }, { route: 'jest' }], method: 'GET', middleware: [] }, [{ route: 'testing' }, { route: 'notJest' }], 2)).toEqual({ match: false });
  expect(router.compareRoutes({ url: [{ route: 'home' }, { route: 'user1' }, { route: 'posts' }], method: 'GET', middleware: [] }, [{ route: 'home' }, { route: 'notUser1' }, { route: 'posts' }], 3)).toEqual({ match: false });
  expect(router.compareRoutes({ url: [{ route: 'home' }, { route: 'profile' }, { route: 'data' }, { route: 'address' }], method: 'GET', middleware: [] }, [{ route: 'home' }, { route: 'profile' }, { route: 'notData' }, { route: 'address' }], 4)).toEqual({ match: false });
  expect(router.compareRoutes({ url: [{ route: 'interface' }, { route: 'user1' }, { route: 'images' }, { route: 'pic1' }], method: 'GET', middleware: [] }, [{ route: 'notInterface' }, { route: 'user1' }, { route: 'images' }, { route: 'pic1' }], 4)).toEqual({ match: false });
});

test('input parameters that contain static routes and params and return { match: true, params: { <param>: <req route> } } if they match', () => {
  expect(router.compareRoutes({ url: [{ route: 'testing' }, { param: 'jest' }], method: 'GET', middleware: [] }, [{ route: 'testing' }, { route: 'jest1' }], 2)).toEqual({ match: true, params: { jest: 'jest1' } });
  expect(router.compareRoutes({ url: [{ route: 'home' }, { param: 'user' }, { param: 'posts' }], method: 'GET', middleware: [] }, [{ route: 'home' }, { route: 'user1' }, { route: 'posts1' }], 3)).toEqual({ match: true, params: { user: 'user1', posts: 'posts1' } });
  expect(router.compareRoutes({ url: [{ route: 'home' }, { param: 'profile' }, { param: 'data' }, { route: 'address' }], method: 'GET', middleware: [] }, [{ route: 'home' }, { route: 'profile1' }, { route: 'data1' }, { route: 'address' }], 4)).toEqual({ match: true, params: { profile: 'profile1', data: 'data1' } });
  expect(router.compareRoutes({ url: [{ route: 'interface' }, { route: 'user1' }, { route: 'images' }, { param: 'pic' }], method: 'GET', middleware: [] }, [{ route: 'interface' }, { route: 'user1' }, { route: 'images' }, { route: 'pic1' }], 4)).toEqual({ match: true, params: { pic: 'pic1' } });
});

test('input parameters that contain static routes and params and return { match: false } if they do not match', () => {
  expect(router.compareRoutes({ url: [{ route: 'testing' }, { param: 'jest' }], method: 'GET', middleware: [] }, [{ route: 'notTesting' }, { route: 'jest1' }], 2)).toEqual({ match: false });
  expect(router.compareRoutes({ url: [{ route: 'home' }, { param: 'user' }, { param: 'posts' }], method: 'GET', middleware: [] }, [{ route: 'notHome' }, { route: 'user1' }, { route: 'posts1' }], 3)).toEqual({ match: false });
  expect(router.compareRoutes({ url: [{ route: 'home' }, { param: 'profile' }, { param: 'data' }, { route: 'address' }], method: 'GET', middleware: [] }, [{ route: 'home' }, { route: 'profile1' }, { route: 'data1' }, { route: 'notAddress' }], 4)).toEqual({ match: false, params: { profile: 'profile1', data: 'data1' } });
  expect(router.compareRoutes({ url: [{ route: 'interface' }, { route: 'user1' }, { route: 'images' }, { param: 'pic' }], method: 'GET', middleware: [] }, [{ route: 'notInterface' }, { route: 'user1' }, { route: 'images' }, { route: 'pic1' }], 4)).toEqual({ match: false });
});

test('input parameters that contain static routes and wildcards and if the request url matches before the wildcard return { match: true }', () => {
  expect(router.compareRoutes({ url: [{ route: 'testing' }, { route: '*' }], method: 'GET', middleware: [] }, [{ route: 'testing' }, { route: 'jest1' }], 2)).toEqual({ match: true });
  expect(router.compareRoutes({ url: [{ route: 'home' }, { route: 'user' }, { route: '*' }], method: 'GET', middleware: [] }, [{ route: 'home' }, { route: 'user' }, { route: 'jest1' }], 3)).toEqual({ match: true });
  expect(router.compareRoutes({ url: [{ route: 'home' }, { route: 'profile' }, { route: 'data' }, { route: '*' }], method: 'GET', middleware: [] }, [{ route: 'home' }, { route: 'profile' }, { route: 'data' }, { route: 'Address' }], 4)).toEqual({ match: true });
  expect(router.compareRoutes({ url: [{ route: 'interface' }, { route: 'user1' }, { route: 'images' }, { route: 'pic' }, { route: '*' }], method: 'GET', middleware: [] }, [{ route: 'interface' }, { route: 'user1' }, { route: 'images' }, { route: 'pic' }, { route: 'pic1' }], 5)).toEqual({ match: true });
});

test('input parameters that contain static routes, param routes and wildcards and if the request url matches before the wildcard return { match: true, params: { <param>: <req route> } }', () => {
  expect(router.compareRoutes({ url: [{ route: 'testing' }, { param: 'jest' }, { route: '*' }], method: 'GET', middleware: [] }, [{ route: 'testing' }, { route: 'jest1' }, { route: 'jest2' }], 3)).toEqual({ match: true, params: { jest: 'jest1' } });
  expect(router.compareRoutes({ url: [{ route: 'home' }, { param: 'user' }, { param: 'posts' }, { route: '*' }], method: 'GET', middleware: [] }, [{ route: 'home' }, { route: 'user1' }, { route: 'post1' }, { route: 'data1' }], 4)).toEqual({ match: true, params: { user: 'user1', posts: 'post1' } });
  expect(router.compareRoutes({ url: [{ route: 'interface' }, { route: 'jest' }, { param: 'posts' }, { route: '*' }], method: 'GET', middleware: [] }, [{ route: 'interface' }, { route: 'jest' }, { route: 'post1' }, { route: 'data1' }], 4)).toEqual({ match: true, params: { posts: 'post1' } });
  expect(router.compareRoutes({ url: [{ route: 'home' }, { route: 'profile' }, { param: 'data' }, { param: 'address' }, { route: '*' }], method: 'GET', middleware: [] }, [{ route: 'home' }, { route: 'profile' }, { route: 'data1' }, { route: 'address1' }, { route: 'image' }], 5)).toEqual({ match: true, params: { data: 'data1', address: 'address1' } });
});

test('input parameters that contain static routes, param routes and wildcards and if the request url does not before the wildcard return { match: false, params: { <param>: <req route> } } ', () => {
  expect(router.compareRoutes({ url: [{ route: 'testing' }, { param: 'jest' }, { route: '*' }], method: 'GET', middleware: [] }, [{ route: 'notTesting' }, { route: 'jest1' }, { route: 'jest2' }], 3)).toEqual({ match: false });
  expect(router.compareRoutes({ url: [{ route: 'home' }, { route: 'user' }, { param: 'posts' }, { route: '*' }], method: 'GET', middleware: [] }, [{ route: 'home' }, { route: 'notUser' }, { route: 'post1' }, { route: 'data1' }], 4)).toEqual({ match: false });
  expect(router.compareRoutes({ url: [{ route: 'interface' }, { param: 'posts' }, { route: 'jest' }, { route: '*' }], method: 'GET', middleware: [] }, [{ route: 'interface' }, { route: 'post1' }, { route: 'notJest' }, { route: 'data1' }], 4)).toEqual({ match: false, params: { posts: 'post1' } });
  expect(router.compareRoutes({ url: [{ route: 'home' }, { route: 'profile' }, { param: 'data' }, { param: 'address' }, { route: '*' }], method: 'GET', middleware: [] }, [{ route: 'home' }, { route: 'notProfile' }, { route: 'data1' }, { route: 'address1' }, { route: 'image' }], 5)).toEqual({ match: false });
});
