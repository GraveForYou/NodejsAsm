const express = require('express');
const router = express.Router();
var path = require('path');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, 'src/public/dataimg');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage });

const adminController = require('../app/controllers/AdminController');

router.get('/', adminController.index);
router.get('/create', adminController.createProduct);
router.post('/create', upload.single('image'), adminController.saveCreate);
router.get('/:id/edit', adminController.editProduct);
router.put('/:id', upload.single('imageu'), adminController.saveUpdate);

module.exports = router;