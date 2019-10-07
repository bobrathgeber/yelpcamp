var express 	= require("express"),
    app 		= express(),
    bodyParser  = require("body-parser"),
	mongoose	= require("mongoose"),
	Campground 	= require("./models/campground");

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true }); 


// Campground.create({
// 	name: "Granite Hill", 
// 	image: "https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402_960_720.jpg"
// 	}, function(err, campground) {
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log(campground);
// 		}
// 	});

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("landing");
});

// RESTFUL ROUTES
//
// name       url       verb      desc.
//=====================================
// INDEX	/dogs		GET		Display list of all dogs
// NEW		/dogs/new	GET		Displays form to make new dog
// CREATE	/dogs		POST	Add new dog to DB
// SHOW		/dogs/:id	GET		Shows info about one dog

//C reate
//R ead
//U pdate
//D estroy	

app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, allcampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("index", {campgrounds: allcampgrounds});
		}
	});
	//res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){	
	// get data from form and add to campgrounds array
	// redirect back to campgrounds
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {name: name, image: image, description: description};
	//campgrounds.push(newCampground);
	Campground.create(newCampground, 
		function(err, campground) {
			if(err){
				console.log(err);
			} else {
				console.log(campground);
			}
		});
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err) {
			console.log(err);
		} else {			
			res.render("show", {campground: foundCampground});
		}
	});
});

//Start listening for requests
app.listen(30000, function() {
	console.log('Server listening on port 30000');
});