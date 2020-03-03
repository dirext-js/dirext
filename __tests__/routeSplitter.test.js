const Dirext = require('../lib/index.js');

const router = new Dirext();

test('input string URL with only static routes and return correct array of objects', () => {
  expect(router.routeSplitter('/home/user1/posts')).toEqual([{ route: 'home' }, { route: 'user1' }, { route: 'posts' }]);
  expect(router.routeSplitter('/home/profile/data/address')).toEqual([{ route: 'home' }, { route: 'profile' }, { route: 'data' }, { route: 'address' }]);
  expect(router.routeSplitter('/interface/user1/images/pic1')).toEqual([{ route: 'interface' }, { route: 'user1' }, { route: 'images' }, { route: 'pic1' }]);
  expect(router.routeSplitter('/testing/jest/dirext/routes')).toEqual([{ route: 'testing' }, { route: 'jest' }, { route: 'dirext' }, { route: 'routes' }]);
});

test('input string URL with static routes and params and return correct array of objects', () => {
  expect(router.routeSplitter('/home/:user/posts')).toEqual([{ route: 'home' }, { param: 'user' }, { route: 'posts' }]);
  expect(router.routeSplitter('/home/user/posts/:postId')).toEqual([{ route: 'home' }, { route: 'user' }, { route: 'posts' }, { param: 'postId' }]);
  expect(router.routeSplitter('/interface/user/images/:imageId')).toEqual([{ route: 'interface' }, { route: 'user' }, { route: 'images' }, { param: 'imageId' }]);
  expect(router.routeSplitter('/testing/jest/dirext/:routeId')).toEqual([{ route: 'testing' }, { route: 'jest' }, { route: 'dirext' }, { param: 'routeId' }]);
});

test('input string URL with static routes and nested params and return correct array of objects', () => {
  expect(router.routeSplitter('/home/:user/posts/:postId')).toEqual([{ route: 'home' }, { param: 'user' }, { route: 'posts' }, { param: 'postId' }]);
  expect(router.routeSplitter('/home/:user/images/:imageId')).toEqual([{ route: 'home' }, { param: 'user' }, { route: 'images' }, { param: 'imageId' }]);
  expect(router.routeSplitter('/interface/:user/images/:imageId')).toEqual([{ route: 'interface' }, { param: 'user' }, { route: 'images' }, { param: 'imageId' }]);
  expect(router.routeSplitter('/testing/:jest/:dirext/route')).toEqual([{ route: 'testing' }, { param: 'jest' }, { param: 'dirext' }, { route: 'route' }]);
});

test('input string URL with static routes and queries and return correct array of objects', () => {
  expect(router.routeSplitter('/home/posts/?user=user1')).toEqual([{ route: 'home' }, { route: 'posts' }, { query: { user: 'user1' } }]);
  expect(router.routeSplitter('/home/user/imageId/?images=image1')).toEqual([{ route: 'home' }, { route: 'user' }, { route: 'imageId' }, { query: { images: 'image1' } }]);
  expect(router.routeSplitter('/user/images/imageId/?interface=interface1')).toEqual([{ route: 'user' }, { route: 'images' }, { route: 'imageId' }, { query: { interface: 'interface1' } }]);
  expect(router.routeSplitter('/testing/jest/dirext/?route=route1')).toEqual([{ route: 'testing' }, { route: 'jest' }, { route: 'dirext' }, { query: { route: 'route1' } }]);
});

test('input string URL with static routes, params, and queries and return correct array of objects', () => {
  expect(router.routeSplitter('/home/posts/:postId/?user=user1')).toEqual([{ route: 'home' }, { route: 'posts' }, { param: 'postId' }, { query: { user: 'user1' } }]);
  expect(router.routeSplitter('/home/user/:imageId/timeStamp/?images=image1')).toEqual([{ route: 'home' }, { route: 'user' }, { param: 'imageId' }, { route: 'timeStamp' }, { query: { images: 'image1' } }]);
  expect(router.routeSplitter('/:user/:userImages/imageId/?interface=interface1')).toEqual([{ param: 'user' }, { param: 'userImages' }, { route: 'imageId' }, { query: { interface: 'interface1' } }]);
  expect(router.routeSplitter('/testing/jest/:dirext/?route=route1')).toEqual([{ route: 'testing' }, { route: 'jest' }, { param: 'dirext' }, { query: { route: 'route1' } }]);
});

test('input string URL with param routes and queries and return correct array of objects', () => {
  expect(router.routeSplitter('/:posts/:timeStamp/?user=user1')).toEqual([{ param: 'posts' }, { param: 'timeStamp' }, { query: { user: 'user1' } }]);
  expect(router.routeSplitter('/:user/:imageId/?images=image1')).toEqual([{ param: 'user' }, { param: 'imageId' }, { query: { images: 'image1' } }]);
  expect(router.routeSplitter('/:user/:images/?interface=interface1')).toEqual([{ param: 'user' }, { param: 'images' }, { query: { interface: 'interface1' } }]);
  expect(router.routeSplitter('/:testing/:jest/:dirext/?route=route1')).toEqual([{ param: 'testing' }, { param: 'jest' }, { param: 'dirext' }, { query: { route: 'route1' } }]);
});

test('input string URL with static routes and wildcard', () => {
  expect(router.routeSplitter('/home/posts/*')).toEqual([{ route: 'home' }, { route: 'posts' }, { route: '*' }]);
  expect(router.routeSplitter('/home/user/userId/*')).toEqual([{ route: 'home' }, { route: 'user' }, { route: 'userId' }, { route: '*' }]);
  expect(router.routeSplitter('/interface/users/*')).toEqual([{ route: 'interface' }, { route: 'users' }, { route: '*' }]);
  expect(router.routeSplitter('/home/posts/*')).toEqual([{ route: 'home' }, { route: 'posts' }, { route: '*' }]);
});

test('input string URL with static routes, params, queries, and wildcard', () => {
  expect(router.routeSplitter('/home/:user/posts/*')).toEqual([{ route: 'home' }, { param: 'user' }, { route: 'posts' }, { route: '*' }]);
  expect(router.routeSplitter('/posts/:timeStamp/*')).toEqual([{ route: 'posts' }, { param: 'timeStamp' }, { route: '*' }]);
  expect(router.routeSplitter('/interface/:users/userInfo/*')).toEqual([{ route: 'interface' }, { param: 'users' }, { route: 'userInfo' }, { route: '*' }]);
  expect(router.routeSplitter('/interface/:home/posts/*')).toEqual([{ route: 'interface' }, { param: 'home' }, { route: 'posts' }, { route: '*' }]);
});
