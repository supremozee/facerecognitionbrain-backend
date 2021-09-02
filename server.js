const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const image = require('./controllers/image')
const profile = require('./controllers/profile')

const app = express()
app.use(cors())
app.use(bodyParser.json())
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Olabisi14',
        database: 'Smart-brain'
    }
});

console.log(db.select('*').from('users'))

const database = {
    users: [
        {
            id: '123',
            name: 'azeez',
            email: 'azeez@gmail.com',
            password: 'supremo',
            entries: 0,
            joined: new Date()

        },
        {
            id: '124',
            name: 'al ameen',
            email: 'alameen@gmail.com',
            password: 'supreme',
            entries: 0,
            joined: new Date()
        }
    ]
}
// app.get('/', (req, res) => {
//     res.json(database.users)
// })
app.get('/', (req, res)=> {
    res.send(db.select('*').from('users')
        )
})
app.post('/signin', (req, res) => {
    signin.handleSignin(req, res, db, bcrypt)
})
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => {
    profile.handleProfile(req, res, db)
})
app.put('/image', (req, res) => {
    image.handleImage(req, res, db)
})
app.post('/imageUrl', (req, res)=> {
    image.handleApiCall(req, res)
})
app.listen(3000, () => {
    console.log("app is running on port")
});
