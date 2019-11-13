module.exports = function (registrationsFactory) {

    function index(req, res) {

        res.render('index');
    }

    return {
        index
    }
}