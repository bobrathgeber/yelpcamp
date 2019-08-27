var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/about", function(req, res){
    res.render("about");
});

app.get("/contact", function(req, res){
    res.render("contact");
});

console.log("Hello!");

//Start listening for requests
app.listen(process.env.PORT, process.env.IP, function() {
	console.log('Server listening on port '+ process.env.PORT);
});