//Definitions go here ==>
const express = require('express')
const app = express()
const port = 8000;

const path = require('path')

const bp = require('body-parser')
app.use(bp.json())
app.use(express.static(__dirname+'/authors-app/dist'))

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/authors')
//<== end definitions

//Schemas go here ==>
var AuthorSchema = new mongoose.Schema({
	name: {type:String, minlength: 3}
}, {timestamps: true})
mongoose.model('Author', AuthorSchema)
var Author = mongoose.model('Author')
//<== end schemas

//Routes go here ==>

app.get('/authors', function(req,res){
	Author.find({}, function(err, authors){
		if(err){
			console.log ("Returned error", err)
			res.json({message: "Error", error: err})
		}
		else {
			res.json({message: "Success", data: authors})
		}
	})
})

app.get('/authors/:id', function(req,res){
	Author.findOne({_id: req.params.id}, function(err, author){
		if(err){
			console.log ("Returned error", err)
			res.json({message: "Error", error: err})
		}
		else {
			res.json({message: "Success", data: author})
		}
	})
})

app.post('/authors', function(req,res){
	var author = new Author({name:req.body.name})
	author.save(function(err){
		if(err){
			console.log ("Returned error", err)
			res.json({message: "Error", error: err})
		}
	})
})

app.put('/authors/:id', function(req,res){
	var author = Author.update({_id: req.params.id}, {name: req.body.name}, function(err){
		if(err){
			console.log ("Returned error", err)
			res.json({message: "Error", error: err})
		}
	})
})

app.delete('/authors/:id', function(req,res){
	Author.remove({_id: req.params.id}, function(err){
		if(err){
			console.log ("Returned error", err)
			res.json({message: "Error", error: err})
		}
	})
})

app.all("*", (req,res,next)=>{
	res.sendFile(path.resolve("./authors-app/dist/index.html"))
})
//<== end routing

//Listing goes here till end ==>
app.listen(port, function(){
	console.log("listening on port",port)
})