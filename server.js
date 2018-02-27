var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/angularApp/dist'));
app.use(express.static('./public'))

mongoose.connect('mongodb://localhost/items');
mongoose.Promise = global.Promise;

var uniqueValidator = require('mongoose-unique-validator');

var ItemSchema = new mongoose.Schema ({
	name: { type: String },
	quantity: { type: Number },
	price: { type: String }
});


mongoose.model('Item', ItemSchema);
var Item = mongoose.model('Item', ItemSchema);


//Retrieve all pets
app.get('/items', function(req, res) {
	Item.find({}, function(err, items) {
		if(err){
			console.log("Returned error", err)
		} else {
			res.json({message: "Success", items: items})
		}
	})
})

// Create a pet
app.post('/items', function(req, res) {
	if(req.body.name.length == 0) {
		res.json({error: "Name is required"})
	} else if (req.body.name.length < 3) {
		res.json({error: "Name is too short"})

	} else if (req.body.quantity.length == 0) {
		res.json({error: "Quantity is required"})
	} else if (req.body.quantity < 0) {
		res.json({error: "Quantity must be greater than or equal to 0"})

	} else if (req.body.price.length == 0) {
		res.json({error: "Price is required"})
	} else if (req.body.price < 0) {
		res.json({error: "Price must be greater than or equal to 0"})

	} else {
		var item = new Item(req.body);
		item.save(function(err, items) {
			if(err){
				console.log("New product error", {error: err})
			} else {
				res.json({message: "Successfully added product", items: items})
			}
		})
	}
})

//Retrieve a pet by id
app.get('/items/:id', function (req, res) {
    Item.findById({_id: req.params.id}, function (err, results) {
        if (err) {
            res.json({
                message: 'something is wrong with the ID',
                error: err
            })
        } else {
            res.json({message: 'Success', data: results})
        }
    })
})

//Delete a product
app.delete('/items/:id', function(req, res) {
	Item.remove({_id: req.params.id}, function(err, results) {
		if(err){
			console.log('Delete error', err)
		} else {
			res.json({message: 'Success delete'});
		}
	})
})

//Edit a product by id
app.put('/items/:id', function (req, res) {
	if(req.body.name.length == 0) {
		res.json({error: "Name is required"})
	} else if (req.body.name.length < 3) {
		res.json({error: "Name is too short"})

	} else if (req.body.quantity.length == 0) {
		res.json({error: "Quantity is required"})
	} else if (req.body.quantity < 0) {
		res.json({error: "Quantity must be greater than or equal to 0"})

	} else if (req.body.price.length == 0) {
		res.json({error: "Price is required"})
	} else if (req.body.price < 0) {
		res.json({error: "Price must be greater than or equal to 0"})

	} else {
		Item.update({_id:req.params.id}, {$set: {name: req.body.name, quantity: req.body.quantity, price: req.body.price }}, {multi: false}, function(err, data){
			if(err){
				res.json({message: 'Error', error:err})
			}else{
				res.json({message: 'Success', success:data})
			}
		})
	}
})


app.all("*", (req, res, next) => {
	res.sendFile(path.resolve("./angularApp/dist/index.html"))
})

app.listen(8000, function() {
	console.log("Belt app listening on port 8000");
})