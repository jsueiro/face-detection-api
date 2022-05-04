const { handle } = require("express/lib/router");

const handleProfileGet = (req, res, pg) => {
    const { id } = req.params;

    pg.select('*').from('users').where('id', id) //can be too .where({id})
        .then(user => {

            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('not found')
            }
        })
        .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
    handleProfileGet: handleProfileGet
}