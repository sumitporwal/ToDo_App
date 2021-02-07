const express=require('express');
var mysql=require('mysql');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const router=express.Router();
const connection=require('../dbconnection');
process.env.SECRET_KEY='secret';

router.get("/Register",function(req,res){
    connection.query("select * from register",(err,results)=>{
      if(err){
        return res.send(err);
      }
      else{
        res.json({
          data:results
        })
      }
     });
    });
router.post("/Register",function(req,res){
      var registeredDate=new Date();
      var item={name:req.body.name,email:req.body.email,phno:req.body.phno,password:req.body.password,regDate:registeredDate};
      connection.query("select email from register where email="+mysql.escape(item.email),function(err,result){
        if(err) throw err;
        if(result.length===0){
          bcrypt.hash(req.body.password,10,(err,hash)=>{
          item.password=hash;
          connection.query("insert into register set ?",item,function(err,results){
            if(err){
             res.send(err);
            }
            else{
                console.log("successfully Inserted records");
                res.json({status:item.email+' registered successfully'});
            }
        });
    });
    }
    else{
      res.send("User Already Registered");
    }
  });
    });

    router.post("/Login",(req,res)=>{
      var item={email:req.body.email, password:req.body.password};
      connection.query("select id,name,email,phno,password from register where email="+mysql.escape(item.email),function(err,result){
          if(err) throw err;
          if(result.length){
             if(bcrypt.compareSync(item.password,result[0].password)){
               user={
                 name:"result[0].name",
                 email:"result[0].email",
                 phno:"result[0].phno",
                 password:"result[0].password"
               };
               let token=jwt.sign(user,process.env.SECRET_KEY,{expiresIn:1440})
               res.send(token);
               console.log(token);
             }
             else{
              res.send("Wrong Email or Password");
            }
          }
          else{
            res.status(400).json({error:"User does not exist"});
          }
      });
    });
    router.post("/Expense",function(req,res){
      var ExpenseDate=new Date();
      var item={title:req.body.title,amount:req.body.amount,description:req.body.description,date:req.body.date,regDate:registeredDate};
      connection.query("select email from register where email="+mysql.escape(item.email),function(err,result){
        if(err) throw err;
        if(result.length===0){
          bcrypt.hash(req.body.password,10,(err,hash)=>{
          item.password=hash;
          connection.query("insert into register set ?",item,function(err,results){
            if(err){
             res.send(err);
            }
            else{
                console.log("successfully Inserted records");
                res.json({status:item.email+' registered successfully'});
            }
        });
    });
    }
    else{
      res.send("User Already Registered");
    }
  });
    });
    router.get("",function(req,res){
      connection.query("select * from register",function(err,result){
        if(err) throw err;
        if(result.length===0){
          res.send("No Users Found");
        }
            else{
                res.json({result});
            }
          });
    });


    
    module.exports=router;