const express = require("express");
const router = express.Router();
var Ticket = mongoose.model('Ticket');

router.get("/viewall", function(req, res){
	
	console.log("Function called");
	Ticket.find({}, {'_id':0},function(err, tickets){
		if(err){
			console.log("ERROR");
		}
		else{
			res.render("viewall", {tickets: tickets});
		}	
	});

});

module.exports = router;
	