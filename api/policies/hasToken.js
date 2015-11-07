module.exports = function (req, res, next) {

    var controller = req.param('controller');
    var action = req.param('action');
    console.log(controller);


    var token = req.headers['authorization'];
    if (token) {
        next();
    } else {
        res.unauthorized(null, null, 'You must provide application token');
    }
};
