const Dirext = require('../index.js');

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
  expect(router.routeSplitter('/home/?user=user1/posts')).toEqual([{ route: 'home' }, { query: { user: 'user1' } }, { route: 'posts' }]);
  expect(router.routeSplitter('/home/user/?images=image1/imageId')).toEqual([{ route: 'home' }, { route: 'user' }, { query: { images: 'image1' } }, { route: 'imageId' }]);
  expect(router.routeSplitter('/?interface=interface1/user/images/imageId')).toEqual([{ query: { interface: 'interface1' } }, { route: 'user' }, { route: 'images' }, { route: 'imageId' }]);
  expect(router.routeSplitter('/testing/jest/dirext/?route=route1')).toEqual([{ route: 'testing' }, { route: 'jest' }, { route: 'dirext' }, { query: { route: 'route1' } }]);
});

test('input string URL with static routes, params, and queries and return correct array of objects', () => {
  expect(router.routeSplitter('/home/?user=user1/posts/:postId')).toEqual([{ route: 'home' }, { query: { user: 'user1' } }, { route: 'posts' }, { param: 'postId' }]);
  expect(router.routeSplitter('/home/user/?images=image1/:imageId/timeStamp')).toEqual([{ route: 'home' }, { route: 'user' }, { query: { images: 'image1' } }, { param: 'imageId' }, { route: 'timeStamp' }]);
  expect(router.routeSplitter('/?interface=interface1/:user/:userImages/imageId')).toEqual([{ query: { interface: 'interface1' } }, { param: 'user' }, { param: 'userImages' }, { route: 'imageId' }]);
  expect(router.routeSplitter('/testing/jest/:dirext/?route=route1')).toEqual([{ route: 'testing' }, { route: 'jest' }, { param: 'dirext' }, { query: { route: 'route1' } }]);
});

test('input string URL with param routes and queries and return correct array of objects', () => {
  expect(router.routeSplitter('/?user=user1/:posts/:timeStamp')).toEqual([{ query: { user: 'user1' } }, { param: 'posts' }, { param: 'timeStamp' }]);
  expect(router.routeSplitter('/:user/?images=image1/:imageId')).toEqual([{ param: 'user' }, { query: { images: 'image1' } }, { param: 'imageId' }]);
  expect(router.routeSplitter('/?interface=interface1/:user/:images')).toEqual([{ query: { interface: 'interface1' } }, { param: 'user' }, { param: 'images' }]);
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
  expect(router.routeSplitter('/?user=user1/:posts/:timeStamp/*')).toEqual([{ query: { user: 'user1' } }, { param: 'posts' }, { param: 'timeStamp' }, { route: '*' }]);
  expect(router.routeSplitter('/interface/:users/userInfo/*')).toEqual([{ route: 'interface' }, { param: 'users' }, { route: 'userInfo' }, { route: '*' }]);
  expect(router.routeSplitter('/?interface=interface1/:home/posts/*')).toEqual([{ query: { interface: 'interface1' } }, { param: 'home' }, { route: 'posts' }, { route: '*' }]);
});
