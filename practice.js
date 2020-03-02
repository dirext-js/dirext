const Dirext = require('./index.js');
const router = new Dirext();

router.use(middleware2, middleware4);
console.log(router.routes)
