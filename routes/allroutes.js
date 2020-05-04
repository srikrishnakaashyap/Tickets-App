module.exports = function(app){
	
	
	
	app.get("/", function(req, res){
	res.render("commands");
	});
	
	
	// View Routes
	
	app.get("/viewall", function(req, res){
		Ticket.find({}, {'_id':0},function(err, tickets){
			if(err){
				console.log("ERROR");
			}
			else{
				res.render("viewall", {tickets: tickets});
			}	
		});

	});
	
	
	app.get("/viewstatus/:seatNo", function(req, res){
		Ticket.find({seatNo: req.params.seatNo}, {'_id':0, 'name': 0, 'mobileNo': 0},function(err, tickets){
			if(err){
				console.log("ERROR");
			}
			else{
				res.render("viewstatus", {tickets: tickets});
			}	
		});

	});


	app.get("/viewdetails/:seatNo", function(req, res){
		Ticket.find({seatNo: req.params.seatNo}, {'_id':0},function(err, tickets){
			if(err){
				console.log("ERROR");
			}
			else{
				res.render("viewdetails", {tickets: tickets});
			}	
		});

	});

	
	app.get("/viewall/open", function(req, res){
	
		Ticket.find({seatStatus: "Open"}, {seatNo: 1, seatStatus: 1},function(err, tickets){
			if(err){
				res.send("Cannot find the open tickets");
			}
			else{
				res.json(tickets);
			}

		})

	});


	app.get("/viewall/close", function(req, res){

		Ticket.find({seatStatus: "Closed"}, {seatNo: 1, seatStatus: 1},function(err, tickets){
			if(err){
				res.send("Cannot find the open tickets");
			}
			else{
				res.json(tickets);
			}

		})

	});
	
	
	
	
	
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
				console.log(update);
				if(ticket[0].seatStatus === "Open"){
					id = ticket[0]._id;
					Ticket.findByIdAndUpdate(id, update, function(err, updated){
						if(err){
							res.render("alreadyclosed");
						}
						else{
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

	
	
	// Reset Routes
	
	// Reset
	app.get("/reset", function(req, res){
		res.render("reset");
	})


	app.post("/resettickets", function(req, res){
		if(req.body.tickets.confirm == "Yes"){

				Ticket.deleteMany({}, function(err){

				if(err){
					console.log("Cannot delete");
				}
				else{

					//console.log("Initializing Addition");
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


					Ticket.find({}, {'_id': 0},function(err, ticket){
						if(err){
							res.send("Cannot Fetch Data");
						}
						else{
							res.json(ticket);
						}
					});

				}

			});
		}
		else{
			res.redirect("/");

		}
	});
	
	
	
	// Handling Route
	
	app.get("*", function(req, res){
	
		res.redirect("/");

	});
	
	
	
	
	
}



