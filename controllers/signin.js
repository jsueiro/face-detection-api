const { handle } = require("express/lib/application");


const handleSignin = (pg, bcrypt) => (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        // return 400 to stop execution if empty form
        return res.status(400).json('incorrect form submission');
    }

    pg.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);

            if (isValid) {
                return pg.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('wrong credentials')
            }

        })
        .catch(err => res.status(400).json('wrong credentials'))

}

module.exports = {
    handleSignin: handleSignin
}

