const Product = require('../models/Product')
const faker = require('faker')
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')

class AdminController {

    index(req, res, next) {
        Product.find({})
            .sort({ 'createdAt': "descending" })
            .then(products => {
                res.render('admin/home', {
                    products: multipleMongooseToObject(products),
                    layout: 'admin'
                });
            })
            .catch(next)
    }

    //[GET] admin/create
    createProduct(req, res, next) {
        res.render('admin/createProduct', { layout: 'admin' });
    }

    //[POST] admin/create
    saveCreate(req, res, next) {
        var formdata = req.body;
        var cat = formdata.category
        if (cat.includes('bag')) {
            formdata.size = req.body.sizesizebag;
        }
        if (cat.includes('shoes')) {
            formdata.size = req.body.sizeshoes;
        }
        if (cat.includes('watches')) {
            formdata.size = req.body.sizewatches;
        }
        if (cat.includes('Male') || cat.includes('Female')) {
            formdata.size = req.body.sizeclothes;
        }
        const file = req.file;
        formdata.image = req.file.path.replace('src\\public\\', '\\')
        const product = new Product(formdata);
        product.save();
        res.redirect('/admin')

    }

    //[GET] admin/:id/edit
    editProduct(req, res, next) {
        Product.findById(req.params.id)
            .then(product => {
                var colors = product.color
                var sizes = product.size
                var genders = product.gender
                var nonColors = []
                if (!product.color.includes('black')) {
                    nonColors.push('black')
                }
                if (!product.color.includes('blue')) {
                    nonColors.push('blue')
                }
                if (!product.color.includes('red')) {
                    nonColors.push('red')
                }
                if (!product.color.includes('green')) {
                    nonColors.push('green')
                }
                if (!product.color.includes('white')) {
                    nonColors.push('white')
                }
                if (!product.color.includes('grey')) {
                    nonColors.push('grey')
                }
                var nonGenders = [];
                if (!product.gender.includes('Male')) {
                    nonGenders.push('Male')
                }
                if (!product.gender.includes('Female')) {
                    nonGenders.push('Female')
                }
                var cat = product.category
                console.log('cat:', cat)
                var nonSizeClothes = ['M', 'L', 'XL', 'XXL', 'S', 'X']
                var nonSizeShoes = [38, 39, 40, 41, 42, 43]
                var nonSizeBag = ['M', 'L', 'XL', 'XXL', 'S', 'X']
                var nonSizeWatches = ['X', 'XL', 'Regular']
                if (cat.includes('bag')) {
                    var sizeBag = []
                    nonSizeBag = []
                    sizeBag = sizes;
                    console.log(product.size)
                    if (!product.size.includes('X')) {
                        nonSizeBag.push('X')
                    }
                    if (!product.size.includes('XL')) {
                        nonSizeBag.push('XL')
                    }
                    if (!product.size.includes('M')) {
                        nonSizeBag.push('M')
                    }
                    if (!product.size.includes('L')) {
                        nonSizeBag.push('L')
                    }
                    if (!product.size.includes('XXL')) {
                        nonSizeBag.push('XXL')
                    }
                    if (!product.size.includes('S')) {
                        nonSizeBag.push('S')
                    }
                }
                if (cat.includes('shoes')) {
                    var sizeShoes = []
                    nonSizeShoes = []
                    sizeShoes = sizes;
                    console.log(product.size)

                    if (!product.size.includes(38)) {
                        nonSizeShoes.push(38)
                    }
                    if (!product.size.includes(39)) {
                        nonSizeShoes.push(39)
                    }
                    if (!product.size.includes(40)) {
                        nonSizeShoes.push(40)
                    }
                    if (!product.size.includes(41)) {
                        nonSizeShoes.push(41)
                    }
                    if (!product.size.includes(42)) {
                        nonSizeShoes.push(42)
                    }
                    if (!product.size.includes(43)) {
                        nonSizeShoes.push(43)
                    }
                }
                if (cat.includes('watches')) {
                    var sizeWatches = []
                    nonSizeWatches = []
                    sizeWatches = sizes;
                    console.log(product.size)
                    if (!product.size.includes('X')) {
                        nonSizeWatches.push('X')
                    }
                    if (!product.size.includes('XL')) {
                        nonSizeWatches.push('XL')
                    }
                    if (!product.size.includes('Regular')) {
                        nonSizeWatches.push('Regular')
                    }
                }
                if (cat.includes('Male') || cat.includes('Female') || cat.includes('men') || cat.includes('women')) {
                    var sizeClothes = []
                    nonSizeClothes = []
                    sizeClothes = sizes;
                    console.log(product.size)
                    if (!product.size.includes('X')) {
                        nonSizeClothes.push('X')
                    }
                    if (!product.size.includes('XL')) {
                        nonSizeClothes.push('XL')
                    }
                    if (!product.size.includes('M')) {
                        nonSizeClothes.push('M')
                    }
                    if (!product.size.includes('L')) {
                        nonSizeClothes.push('L')
                    }
                    if (!product.size.includes('XXL')) {
                        nonSizeClothes.push('XXL')
                    }
                    if (!product.size.includes('S')) {
                        nonSizeClothes.push('S')
                    }

                }
                res.render('admin/editProduct', {
                    product: mongooseToObject(product),
                    genders: genders,
                    nonGenders: nonGenders,
                    noncolors: nonColors,
                    colors: colors,
                    sizes: sizes,
                    nonSizeClothes: nonSizeClothes,
                    nonSizeBag: nonSizeBag,
                    nonSizeShoes: nonSizeShoes,
                    nonSizeWatches: nonSizeWatches,
                    sizeClothes: sizeClothes,
                    sizeBag: sizeBag,
                    sizeShoes: sizeShoes,
                    sizeWatches: sizeWatches,
                    layout: 'admin'
                })
            })
            .catch(next);

    }

    // [PUT] admin/products/:id
    saveUpdate(req, res, next) {

        Product.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin'))
            .catch(next);
    }

}

module.exports = new AdminController;