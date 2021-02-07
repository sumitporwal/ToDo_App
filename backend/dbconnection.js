var mysql=require('mysql');
var connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"expense_tracker"
})
connection.connect(err=>{
    if(err){
        return err;
    }
    else{
        console.log("connected");
    }
});
module.exports=connection;