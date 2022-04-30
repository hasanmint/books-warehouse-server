const express = require('express');
const cors = require('cors');
// require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();

// Middileware
app.use(cors());//use cors()
app.use(express.json());//body parse



//db connection

const uri = "mongodb+srv://dbUser1:yZ2c5RrLiQCAwaAA@cluster0.qyrzo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log('connected');

async function run() {
    try {
        await client.connect();
        const userCollection = client.db("foodExpress").collection("user");
        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })
    } finally {
        // await client.close();//
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Welcome My CURD Server');
});

app.get('/test', (req, res) => {
    res.send('test');
});

app.listen(port, () => {
    console.log('CRUD Listen Server is Running');
})
