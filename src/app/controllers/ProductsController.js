const Product = require('../models/Product')
const faker = require('faker')
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')

class ProductsController {

    //[GET] /products
    index(req, res, next) {
        Product.find({})
            .then(products => {

                var category = products.map(product => {
                    var [a, ...rest] = product.category
                    return a.toLowerCase()
                })
                res.render('client/products/products', {
                    products: multipleMongooseToObject(products),
                    category: category
                });
            })
            .catch(next);
    }

    //[POST]/products modal
    GetProductQuickView(req, res, next) {

        var data_id = req.body.id
        console.log(data_id)
        Product.findById(data_id)
            .then(product => {
                console.log(product)
                res.json(product)
            })
            .catch(next);

    }
}

module.exports = new ProductsController;