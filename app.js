var bodyParser = require("body-parser");
methodOverride = require("method-override");

express = require("express");
app = express();

// Defining Routes
//require("./routes/routes")(app);



// App config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));



require('./models/Ticket');




const router = require("./routes/view.js");
app.use(router);

const router1 = require("./routes/update.js")
app.use(router1);

const viewall = require("./routes/viewall.js");
app.use(viewall);

const router2 = require("./routes/handle.js");
app.use(router2);




app.listen(process.env.PORT, process.env.IP, function(){
	
	console.log("SERVER IS RUNNING");
});

