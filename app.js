const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

//  const DB = process.env.DATABASE;
// const PORT = 80;

// import mongoose and defining
var mongoose = require('mongoose');
const bodyparser = require("body-parser");

//
// mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true, useUnifiedTopology: true});
//

  const dotenv = require("dotenv");

 dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;
const PORT = process.env.port;



mongoose.connect(DB, {
	 useNewUrlParser: true
	 });
// */

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
	console.log("we are connected..")
})	 

let data = {};

// Defining Schema of mongoose for database
var contactSchema = new mongoose.Schema({
	name: String,
	phone: String,
	email: String,
	Address: String,
	desc: String,
});
var contact = mongoose.model('contact', contactSchema);

// using static folder and file
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine', 'pug') //Set template to PUG
app.set('views', path.join(__dirname, 'views')); //set view directry

//ENDPOINTS
app.get('/',(req,res)=>{
	const params = { };
	res.status(200).render('home.pug',params);
})

app.get('/about',(req,res)=>{
	const params = { };
	res.status(200).render('about.pug',params);
})

app.get('/Services',(req,res)=>{
	const params = { };
	res.status(200).render('Services.pug',params);
})


app.get('/contact',(req,res)=>{
	const params = { };
	res.status(200).render('contact.pug');
})

app.get('/weight_Loss',(req,res)=>{
	res.status(200).render('weight_Loss.pug');
})

app.get('/weight_Gain',(req,res)=>{
	res.status(200).render('weight_Gain.pug');
})

app.get('/stamina',(req,res)=>{
	res.status(200).render('stamina.pug');
})


// posting requests
app.post('/contact',(req,res)=>{
	var myData = new contact(req.body);
	myData.save().then(() =>{
		res.send("This item has save in database.")
		
	contact.find().then((result)=>{
	// storing database data into object to render it
	// on webpage as a list of orders made
	console.log(result);})

		
	}).catch(()=> {
		res.status(400).send("This item has not been save in database.")
	});
	
	//res.status(200).render('contact.pug',params);
})

//START THE SERVER
app.listen(PORT,()=>{
	console.log(`The application has started successfully at port ${PORT}`);
})