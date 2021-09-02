const handleProfile= (req, res, db) => {
    const { id } = req.params
    db.select('*').from('users').where({ id }).then(user => {
        console.log(user)
        if (user.length) {
            res.json(user[0])
        }
        res.status(400).json('not found')
    }).catch(err => res.status(400).res.json('not found profile'))
}
module.exports= {
    handleProfile: handleProfile
}