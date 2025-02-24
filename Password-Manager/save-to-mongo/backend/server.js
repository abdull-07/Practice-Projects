    const express = require('express')
    const bodyParser = require('body-parser')
    const dotenv = require('dotenv')
    const { MongoClient } = require('mongodb');

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
    res.send({success: true, result: insertResult})
    })

    //* Delete a document
    app.delete('/', async (req, res) => {
        const password = req.body
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const deleteResult = await collection.deleteOne(password);
    res.send({success: true, result: deleteResult})
    })



    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    })  