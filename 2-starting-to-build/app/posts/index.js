const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});


const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

// Route to create a post
app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {
        id, title
    };

    res.status(201).send(posts[id]);
});




app.listen(5000, () => console.log('Listening on port 8000'));