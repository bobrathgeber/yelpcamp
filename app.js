var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/about", function(req, res){
    res.render("about");
});

console.log("Hello!");

//Start listening for requests
app.listen(process.env.PORT, function() {
	console.log('Server listening on port 30000');
});