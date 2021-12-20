const productsRouter = require('./products');
const siteRouter = require('./site');
const adminRouter = require('./admin');

function route(app) {
    app.use('/admin', adminRouter)
    app.use('/products', productsRouter)
    app.use('/', siteRouter)
};
module.exports = route;