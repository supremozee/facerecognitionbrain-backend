const handleSignin = (req, res, db, bcrypt) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json("incorrect form submission")
    }
    db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email).then(data=> {
        const isValid = bcrypt.compareSync(password, data[0].hash)
        if(isValid) {
            return db.select('*').from('users').where('email', '=', email)
            .then(user=> {
                res.json(user[0])
            })
            .catch(err=> res.status(400).res.json('unable to get user'))
        }
    })
    .catch(err=> res.status(400).res.json('wrong credential'))
 }
 module.exports = {
     handleSignin: handleSignin
 }