class SiteController {

    //[GET] /
    index(req, res, next) {
        res.render('client/home')
    }

}

module.exports = new SiteController;