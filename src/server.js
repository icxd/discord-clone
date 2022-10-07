const express = require('express');
const app = express();

// Connect to a mongodb database named "discord-clone"
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/discord-clone';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the database
client.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to database');
    }
});


app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    // Get all servers from the database and render them
    const servers = await client.db('discord-clone').collection('server-data').find().toArray();
    res.render('index', { servers });
});

app.listen(3000, () => console.log('Server is listening on port 3000'));