const express = require ('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRoutes = require('./routes');

const app = express();
const port = 9000;

const connectWithDB = async () => {
    try {
      await mongoose.connect("mongodb+srv://todo123:123Todo@cluster0.vcoqkv6.mongodb.net/learnandgrow?retryWrites=true&w=majority");
      console.log('DB Connected');
    } catch(error){
      console.log("Error while connecting with DB", error.message)
    }
  }
  connectWithDB();
  app.use(cors());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',apiRoutes); 

app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
})
