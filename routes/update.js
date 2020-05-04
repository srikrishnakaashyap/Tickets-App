const express = require("express");
const router = express.Router();
var Ticket = mongoose.model('Ticket');


// Update Routes

// Close the ticket
app.get("/update/close", function(req, res){

	res.render("close");
});

app.put("/closeticket", function(req, res){
	console.log("Function Called");
	var seatNo = req.body.tickets.seatNo;

	Ticket.find({seatNo: seatNo}, function(err, ticket){
		if(err){
			res.send("Error. Please enter a valid Seat Number");
		}
		else{
			var update = {name: req.body.tickets.name, mobileNo: req.body.tickets.mobileNo, seatStatus: "Closed"}
			//console.log(update);
			if(ticket[0].seatStatus === "Open"){
				//console.log(ticket);
				id = ticket[0]._id;
				Ticket.findByIdAndUpdate(id, update, function(err, updated){
					if(err){
						res.response("Cannot Book the ticket at this time");
					}
					else{
						console.log(updated);
						res.send("Ticket Booked Successfully");
					}


				});
				//res.send("Successfully Booked the ticket");
			}
			else{
				res.render("alreadyclosed");
			}


		}


	});

});



// Open the ticket
app.get("/update/open", function(req, res){

	res.render("open");
});

app.put("/openticket", function(req, res){
	var update ={name: null, mobileNo: null, seatStatus:"Open"};

	Ticket.updateOne({seatNo: req.body.tickets.seatNo}, update, function(err){

		if(err){

			res.send("Cannot Open the ticket");
		}

		else{
			res.send("Successfully Opened the Ticket");
		}

	});
});



module.exports = router;