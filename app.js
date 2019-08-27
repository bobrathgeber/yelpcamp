var express 	= require("express"),
    app 		= express(),
    bodyParser  = require("body-parser"),
	mongoose	= require("mongoose");

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true }); 

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

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

// var campgrounds = [
// 		{name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2016/11/29/04/17/bonfire-1867275_960_720.jpg"},
// 		{name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402_960_720.jpg"},
// 		{name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/11/21/16/03/campfire-1846142_960_720.jpg"},
// 		{name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2016/11/29/04/17/bonfire-1867275_960_720.jpg"},
// 		{name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402_960_720.jpg"},
// 		{name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/11/21/16/03/campfire-1846142_960_720.jpg"},
// 		{name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2016/11/29/04/17/bonfire-1867275_960_720.jpg"},
// 		{name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402_960_720.jpg"},
// 		{name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/11/21/16/03/campfire-1846142_960_720.jpg"}
// 	];
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, allcampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds", {campgrounds: allcampgrounds});
		}
	})
	//res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){	
	// get data from form and add to campgrounds array
	// redirect back to campgrounds
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
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
})

app.get("/campgrounds/new", function(req, res) {
	res.render("new.ejs");
});

//Start listening for requests
app.listen(30000, function() {
	console.log('Server listening on port 30000');
});