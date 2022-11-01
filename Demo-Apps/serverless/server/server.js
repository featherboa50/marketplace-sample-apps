function getTicketfromDesc(desc) {
	
	//parent
		if (desc.toLowerCase().includes('merged')){
			var r = /\d+/;
			var ticket = desc.match(r);
			console.log("Merged ticket:" + ticket);
		//child
		//other
		}else{
			console.log("Not merged");
		}
}

exports = {
    onTicketUpdateCallback: function(payload) {
		console.log("Update");
        //console.log("Logging arguments from onTicketUpdate event: " + JSON.stringify(payload));
        //Finding fields that are changed
        var changes = payload.data.changes;
		var cc = payload.data.ticket.reply_cc_emails;
		//var change_type = JSON.parse(changes);
        //prints list of changes
		console.log("changes: " + JSON.stringify(changes));
		console.log(changes["status"][1]);
		
		//if status changed to close print cc emails
		if (changes["status"][1] === 2){
			console.log(cc);
		}
    },
	 onConversationCreateCallback: function (args) {
		 console.log("Convo");
		var description = args.data.conversation.body_text;
		getTicketfromDesc(description);
		
		
		curl -v -u CnvwmbRJJe7zUowpWh:X -H "Content-Type: application/json" -X GET 'https://resideworldwide.freshservice.com/api/v2/tickets/11625'
		
	}
}