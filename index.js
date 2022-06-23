var express=require("express");
var mongoClient=require("mongodb").MongoClient;
var app=express();
var connectionString="mongodb://127.0.0.1:27017";
app.get("/",(req,res)=>{
    res.send(`<h2>API</h2><br><a href="http://127.0.0.1:4000/products">/products</a><br><a href="http://127.0.0.1:4000/categories">/categories</a>`)
});
app.get("/products",function(req,res){
    mongoClient.connect(connectionString,function(err,clientObj){
        if(!err){
            var database=clientObj.db("northwind");
            database.collection("tblproducts").find({}).toArray(function(err,documents){
                if(!err){
                    res.send(documents)
                }
            })
        }
    })
})
app.get("/categories",(req,res)=>{
    mongoClient.connect(connectionString,function(err,clientObj){
        if(!err){
            var database=clientObj.db("northwind");
            database.collection("tblcategories").find({}).toArray(function(err,documents){
                if(!err){
                    res.send(documents)
                }
            })
        }
    })
});
app.listen(4000);
console.log("Server Started http://localhost:4000");