const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
var cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())
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
app.post('/signin', (req, res) => {
//     // Load hash from your password DB.
// bcrypt.compare(password, hash , function(err, result) {
//     console.log('first guess', result)
// });
// bcrypt.compare(password, hash, function(err, result) {
//    console.log('second guess', result)
// });
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        res.json(database.users)
    } 
      else {
        res.status(400).json('error')
    }
})
app.post('/register', (req, res) => {
    const { name, email, password } = req.body
    // bcrypt.hash(password, null, null, function(err, hash) {
    //     console.log(hash)
    // });
    database.users.push({
          
          name: name,
          email: email,
          password: password,
          entries: 0,
          joined: new Date()
    })
    res.json(database.users[database.users.length-1]) 
})

app.get('/profile/:id', (req, res)=> {
       const { id} = req.params
       let found = false;
       database.users.forEach(user=> {
           if (user.id === id) {
               found = true;
               return res.json(user)
           }
       })
       if (!found) {
           res.status(400).json('no such user')
       }
})
app.put('/image', (req, res)=> {
    const { id} = req.body
    let found = false;
    database.users.forEach(user=> {
        if (user.id === id) {
            found =true;
            user.entries++
            res.json(user.entries)
        }
    })
    if (!found) {
        res.status(400).json('error id')
    }
})


app.listen(3000, () => {
    console.log("app is running on port")
});
