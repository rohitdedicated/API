var express=require("express");
const { parseJSON } = require("jquery");
var mongoClient=require("mongodb").MongoClient;
var app=express();
var connectionString="mongodb://127.0.0.1:27017";
app.get("/",(req,res)=>{
    res.send(`
        <h2>API</h2>
        <a href="http://127.0.0.1:4000/products/1">/products</a>
    `)
});
app.get("/products/:id",function(req,res){
    var productId=parseInt(req.params.id);
    mongoClient.connect(connectionString,function(err,clientObj){
        if(!err){
            var database=clientObj.db("northwind");
            database.collection("tblproducts").find({id:productId}.toArray(function(err,documents){
                if(!err){
                    res.send(documents)
                }
            }))
        }
    })
})
app.get("/categories/:category",function(req,res){
    var categoryName=req.params.category;
    mongoClient.connect(connectionString,function(err,clientObj){
        if(!err){
            var database=clientObj.db("northwind");
            database.collection("tblproducts").find({category:categoryName}.toArray,function(err,documents){
                if(!err){
                    res.send(documents)
                }
            })
        }
    })
})
app.listen(4000);
console.log("Server Started http://localhost:4000");