const express = require("express");
const router = express.Router();
var Ticket = mongoose.model('Ticket');

router.get("/", function(req, res){
	res.render("commands");
	});
	
	
	// View Routes
	
	
	
router.get("/viewstatus/:seatNo", function(req, res){
	Ticket.find({seatNo: req.params.seatNo}, {'_id':0, 'name': 0, 'mobileNo': 0},function(err, tickets){
		if(err){
			console.log("ERROR");
		}
		else{
			console.log(tickets);
			res.render("viewstatus", {tickets: tickets});
		}	
	});

});


router.get("/viewdetails/:seatNo", function(req, res){
	Ticket.find({seatNo: req.params.seatNo}, {'_id':0},function(err, tickets){
		if(err){
			console.log("ERROR");
		}
		else{
			res.render("viewdetails", {tickets: tickets});
		}	
	});

});


router.get("/viewall/open", function(req, res){

	Ticket.find({seatStatus: "Open"}, {seatNo: 1, seatStatus: 1},function(err, tickets){
		if(err){
			res.send("Cannot find the open tickets");
		}
		else{
			res.json(tickets);
		}

	})

});


router.get("/viewall/close", function(req, res){

	Ticket.find({seatStatus: "Closed"}, {seatNo: 1, seatStatus: 1},function(err, tickets){
		if(err){
			res.send("Cannot find the open tickets");
		}
		else{
			res.json(tickets);
		}

	})

});


module.exports = router;