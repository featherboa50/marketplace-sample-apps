exports = {
    onTicketUpdateCallback: function(payload) {
        //console.log("Logging arguments from onTicketUpdate event: " + JSON.stringify(payload));
        //Finding fields that are changed
        var changes = payload.data.changes;
		var cc = payload.data.ticket.reply_cc_emails;
		//var change_type = JSON.parse(changes);
        //prints list of changes
		console.log("changes: " + JSON.stringify(changes));
		console.log(changes["status"][1]);
		
		//if status changed to close print cc emails
		if (changes["status"][1] === 1){
			console.log(cc);
		}
    }
}