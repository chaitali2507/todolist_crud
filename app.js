var express = require('express');
var bodyParser = require('body-parser');
var mysql=require('mysql');

var con =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"todolistcrud",
});

con.connect();

var app =express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine","ejs");

app.get('/',function(req,res){
    var query="select * from user";

    con.query(query,function(error,result,field){
        if(error) throw error;
        res.render('index',{result});
    })
   
});
app.post('/',function(req,res){
    var name=req.body.name;
  

    var query="insert into user(name)values('"+name+"')";

    con.query(query,function(error,result,field){
        if(error) throw error;
        res.redirect("/");
    })
});
app.get('/delete/:id',function(req,res){
    var id=req.params.id;

    var query="delete from user where id="+id;
    con.query(query,function(error,result,field){
        if(error) throw error;
        res.redirect('/');
    })
})
app.get('/update/:id',function(req,res){
    var id=req.params.id;

    var query="select * from user where id="+id;

    con.query(query,function(error,result,field){
        if(error) throw error;
        res.render('update',{result});
    })
});
app.post('/update/:id',function(req,res){
    var id=req.params.id;
    var name=req.body.name;
    var query="update user set name='"+name+"' where id="+id;

    con.query(query,function(error,result,field){
        if(error) throw error;
        res.redirect("/");
    })    
})

app.listen(2000);
