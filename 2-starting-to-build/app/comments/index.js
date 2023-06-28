const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const CORS = require('cors');

const app = express();
app.use(CORS());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

const commentsByPostId = {};

app.get('/allcomments', (req, res) => {
    res.send(commentsByPostId);
});

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// Route to create a post
app.post('/posts/:id/comments', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id, content });

    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
});




app.listen(8000, () => console.log('COMMENTS on port 8000'));