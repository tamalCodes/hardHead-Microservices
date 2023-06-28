const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require("cors")

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});


const posts = [];

app.get('/posts', (req, res) => {
    res.send(posts);
});

// Route to create a post
app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    const newPost = { id, title };
    posts.push(newPost);

    res.status(201).send(posts);
});




app.listen(5000, () => console.log('POSTS on port 5000'));