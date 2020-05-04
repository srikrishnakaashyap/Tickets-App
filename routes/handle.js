const express = require("express");
const router = express.Router();
var Ticket = mongoose.model('Ticket');



app.get("/reset", function(req, res){
	res.render("reset");
});

app.delete("/reset/delete", function(req, res){
	
	if(req.body.tickets.confirm == "Yes"){
		Ticket.deleteMany({}, function(err){

			if(err){
				console.log("Cannot delete");
			}
			else{
				
				console.log("Deleted")
				
				//req.method = "GET";
				
				res.redirect(307, "/resettickets");
				
				//console.log("response");
			}
		});
	
	}
	
	else{
		res.redirect("/");
	}
	
});

app.post("/resettickets", function(req, res){
	

	console.log("Initializing Addition");
	var t = []
	for(var i = 1; i < 41; i++){
		t.push({ seatNo: i, name: null, mobileNo: null, seatStatus: "Open"});
	}

	//console.log("Performing Addition");
	Ticket.collection.insertMany(t, function(err, tickets){
	if(err){
		res.send("Cant Insert data");
		}
	});


	res.redirect("/");
});


// Handling Route

app.get("*", function(req, res){

	res.redirect("/");

});



module.exports = router;