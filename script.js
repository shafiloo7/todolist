const express = require("express")
const app = express()
const ejs = require("ejs")

app.use(express.static('static'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb+srv://sha:shapassword@cluster0.6l2ff.mongodb.net/second'
const dbClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
dbClient.connect((err) => {
    if (err) {
        console.log('error')
    } else {
        console.log('success')

    }
})


app.get('/delete', async(req, res) => {
    const database = dbClient.db('second')
    console.log(req.query.id)
    await database.collection('collection3').deleteOne({ id: req.query.id })
    res.redirect("/")
})

app.post('/', async(req, res) => {
    const database = dbClient.db('second')
    let data = req.body
    data.id = `${Date.now()}`
    console.log(data)
    await database.collection('collection3').insertOne(data).then(() => {
        console.log('success')
    }).catch((e) => {
        console.log(e)
    })
    res.redirect('/')
})
app.get('/', async(req, res) => {
    const database = dbClient.db('second')
    let data = [];
    let d = await database.collection('collection3').find({})
    await d.forEach((i) => {
        data.push(i)
    })
    res.render('todolist', { data })
})



app.listen(4040)