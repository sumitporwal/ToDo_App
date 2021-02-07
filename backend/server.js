const express=require("express");
const mysql=require('mysql');
const connection=require('./dbconnection');
const bodyParser=require('body-parser');
const cors=require('cors');
const getroute=require('./routes/getroute');
const port=process.env.PORT || 5000; 
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
var app=express();
app.use(cors(corsOptions));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:true}));
 app.use('/Users',getroute);
 app.listen(port,function(){
     console.log("Server started at Port"+port);
 });
 