mongoose = require("mongoose");

// Database Config
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb+srv://admin:admin@cluster0-btg0g.mongodb.net/test?retryWrites=true&w=majority", function(err){
	
	if(err){
		
		console.log(err);
	}
	else{
		console.log("Connected");
	}
	
});


var ticketSchema = new mongoose.Schema({
	seatNo: Number,
	seatStatus: {type: String, default: "Open"},
	name: {type: String, default: null},
	mobileNo: {type: Number, default: null},
	//bookedOn: {type: Date, default: Date.now}
});

var Ticket = mongoose.model("Ticket", ticketSchema);