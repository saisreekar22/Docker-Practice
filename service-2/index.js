'use strict';

const express = require('express');
const url = require('url');
const app = express();
const mongoose = require("mongoose");
const mongoClient = require('mongodb').MongoClient
const cors = require("cors");
const { error } = require('console');
app.use(cors());

const port = 8000;
mongoose.connect("mongodb://mongo:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
  
let database

app.get('/', (req, res) => {
  database.collection('contacts').find({}).toArray((err, result)=> {
    if (err) throw err
    const size = result.length;
    const sum = result.reduce((r, resultItem) => r + resultItem.num, 0);
    res.send(String(sum / size));
  })
});

app.listen(port, () => {
  mongoClient.connect(
    "mongodb://mongo:27017",
    { useNewUrlParser: true },
    (error, result) => {
      if (error) throw error;
      database = result.db('test')
      console.log('Connection Sucessful');
    }
  );
})