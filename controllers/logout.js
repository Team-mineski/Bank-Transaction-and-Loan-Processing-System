const logout = (req, res) => {
        if (req.session) {
            req.session.destroy();
        }
        res.redirect('/');
    }


module.exports.logout = logout;