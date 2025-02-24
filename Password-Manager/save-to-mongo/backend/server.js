const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const corse = require('cors')

// or as an es module:
// import { MongoClient } from 'mongodb'
dotenv.config()

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'keyvault';

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(corse())

client.connect();

//* Get all documents
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//* Save a document
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const insertResult = await collection.insertOne(password);
    res.send({ success: true, result: insertResult })
})

//* Delete a document
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const deleteResult = await collection.deleteOne(password);
    res.send({ success: true, result: deleteResult })
})

//* Update a document
app.put('/', async (req, res) => {
    const { id, site, username, password, notes } = req.body;

    if (!id) {
        return res.status(400).send({ success: false, message: "ID is required." });
    }

    try {
        const db = client.db(dbName);
        const collection = db.collection('passwords');

        const updateResult = await collection.updateOne(
            { id: id }, // Match by the 'id' field
            {
                $set: {
                    site: site,
                    username: username,
                    password: password,
                    notes: notes
                }
            }
        );

        if (updateResult.matchedCount === 0) {
            return res.status(404).send({ success: false, message: "Document not found." });
        }

        res.send({ success: true, result: updateResult });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal server error." });
    }
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})  