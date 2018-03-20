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
	name: {type:String, minlength: 3},
	quotes: [{
		quote:{type:String, required:true, minlength: 3},
		votes:{type:Number, default: 0}
	}]
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
		else{
			res.json({message: "Success"})
		}
	})
})

app.put('/authors/:id', function(req,res){
	var author = Author.update({_id: req.params.id}, {name: req.body.name}, { runValidators: true }, function(err){
		if(err){
			console.log ("Returned error", err)
			res.json({message: "Error", error: err})
		}
		else{
			res.json({message: "Success"})
		}
	})
})

app.delete('/authors/:id', function(req,res){
	Author.remove({_id: req.params.id}, function(err){
		if(err){
			console.log ("Returned error", err)
			res.json({message: "Error", error: err})
		}
		else{
			res.json({message: "Success"})
		}
	})
})
app.put('/authors/quotes/:id', function(req,res){
	Author.findOne({_id: req.params.id}, function(err, author){
		if(err){
			console.log ("Returned error", err)
			res.json({message: "Error", error: err})
		}
		else {
			author.quotes.push({quote: req.body.quote, votes:0})
			author.save(function(err){
				if(err){
					for(each in err['errors']){
						var trueError = err['errors'][each]['message']
						console.log(trueError)
					}
					res.json({message: "Error", error: trueError})
				}
				else{
					res.json({message: "Success"})
				}
			})
		}
	})
})
app.put('/authors/votes/:id', function(req,res){
	Author.findOne({_id: req.params.id}, function(err, author){
		if(err){
			res.json({message: "Error", error: err})
		}
		else {
			for(var i = 0; i < author['quotes'].length; i++){
				if(req.body.index == i){
					author['quotes'][i]['votes']+=req.body.change
					author.save(function(err){
						if(err){
							res.json({message: "Error", error: err})
						}
						else{
							res.json({message: "Success"})
						}
					})
				}
			}
		}
	})
})
app.put('/authors/delete/:id', function(req,res){
	Author.findOne({_id: req.params.id}, function(err, author){
		if(err){
			res.json({message: "Error", error: err})
		}
		else {
			for(var i = 0; i < author['quotes'].length; i++){
				if(req.body.index == i){
					author['quotes'].splice(i,1)
					author.save(function(err){
						if(err){
							res.json({message: "Error", error: err})
						}
						res.json({message: "Success"})
					})
				}
			}
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