const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors({ origin: true, credentials: true}))

app.use(express.json())

mongoose.connect('mongodb://localhost:27017/todolist', { useUnifiedTopology: true }, { useNewUrlParser: true }).then(() => {
    console.log('Connected to database')
}).catch((e) => console.log('Error: '+e))

const Todotask = mongoose.model('ToDO List', new mongoose.Schema({
    todo: {
      type: String,
      minlength: 2,
      required: true  
    }
}))

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/api/gettodo', async (req, res) => {
    const todotasks = await Todotask.find()
    // if(todotasks.length === 0) return res.send('TODO List is empty')
    res.send(todotasks)
})

app.post('/api/addtodo', async (req, res) => {
    const todotask = new Todotask({
        todo: req.body.todo
    })
    await todotask.save()
})

app.delete('/api/deletetodo/:id', async (req, res) => {
    await Todotask.findByIdAndDelete(req.params.id)
})

app.listen(5000,() => {console.log('Server is running on port 5000')})