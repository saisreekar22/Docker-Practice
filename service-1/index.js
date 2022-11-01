'use strict';

const express = require('express');
const url = require('url');
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());

const port = 5000;
const URL =
  "mongodb://mongo:27017";
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(URL, connectionParams).then(() => {
   console.log("connected to the database");
}).catch((err) => {
    console.error(`Error:${err}`)
});
  
const contactSchema = {
    num: {
        type:Number
    }
};

const Contact = mongoose.model("Contact", contactSchema);

app.get('/', async(req, res) => {
  let url_msg = url.parse(req.url, true).query
  let num = Number(url_msg.msg)
  const contact = new Contact({ num })
  
  contact.save(function (err){
    if (err) throw err;
    else {
      console.log(contact);
    }
  }
)
    res.send("Entered "+url_msg.msg)
});


app.listen(port);
console.log(`running on http://${port}`);