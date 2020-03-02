const Dirext = require('../index.js');

const router = new Dirext();

test('input url and middlewareFuncs as args and check to see that correct obj has been pushed into this.routes array', () => {
  const middleware1 = () => 'testing1';
  const middleware2 = () => 'testing2';
  const middleware3 = () => 'testing3';
  const middleware4 = () => 'testing4';

  router.use('/home', middleware1);
  expect(router.routes[router.routes.length - 1]).toEqual(
    {
      url: [{ route: 'home' }],
      method: '',
      middleware: [middleware1],
    },
  );

  router.use('/interface', middleware2, middleware3);
  expect(router.routes[router.routes.length - 1]).toEqual(
    {
      url: [{ route: 'interface' }],
      method: '',
      middleware: [middleware2, middleware3],
    },
  );

  router.use('/home/user/images', middleware1, middleware4);
  expect(router.routes[router.routes.length - 1]).toEqual(
    {
      url: [{ route: 'home' }, { route: 'user' }, { route: 'images' }],
      method: '',
      middleware: [middleware1, middleware4],
    },
  );

  router.use('/interface/user/images/pic1', middleware2, middleware3, middleware4);
  expect(router.routes[router.routes.length - 1]).toEqual(
    {
      url: [{ route: 'interface' }, { route: 'user' }, { route: 'images' }, { route: 'pic1' }],
      method: '',
      middleware: [middleware2, middleware3, middleware4],
    },
  );

  router.use(middleware2);
  expect(router.routes[router.routes.length - 1]).toEqual(
    {
      url: [{ route: 'global' }],
      method: '',
      middleware: [middleware2],
    },
  );

  router.use(middleware2, middleware4);
  expect(router.routes[router.routes.length - 1]).toEqual(
    {
      url: [{ route: 'global' }],
      method: '',
      middleware: [middleware2, middleware4],
    },
  );

  router.use(middleware1, middleware3, middleware4);
  expect(router.routes[router.routes.length - 1]).toEqual(
    {
      url: [{ route: 'global' }],
      method: '',
      middleware: [middleware1, middleware3, middleware4],
    },
  );

  router.use(middleware1, middleware2, middleware3, middleware4);
  expect(router.routes[router.routes.length - 1]).toEqual(
    {
      url: [{ route: 'global' }],
      method: '',
      middleware: [middleware1, middleware2, middleware3, middleware4],
    },
  );
});
