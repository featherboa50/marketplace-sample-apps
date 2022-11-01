function getCC(args){
	var request = [{
		method: 'GET',
		//url: `${args.domain}/api/v2/tickets/${args.ticket}`.
		//apiKey: args.apiKey
	}];
}

/*function putCC(){
	
}*/

//if positive we want to pull cc from returned ticket, else push cc to returned ticket
function getTicketfromDesc(desc) {
	var r = /\d+/;
	var ticket;
	
	//parent
	if (desc.toLowerCase().includes('merged from')){
		ticket = parseInt(desc.match(r));
		console.log("Child ticket:" + ticket);
	//child do i need this? or willit make a loop?
	}else if(desc.toLowerCase().includes('merged into')){
		ticket = -(parseInt(desc.match(r)));
		console.log("Parent ticket:" + ticket);
	//Not a merge no further action needed
	}else{
		ticket = 0;
		console.log("Not merged");
	}
	return ticket;
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
		const data = args.data,
		key = args.iparams.apiKey
		description = args.data.conversation.body_text;
		var tick = getTicketfromDesc(description);
		//console.log(iparams.apiKey);
		
		if(tick > 0){ //pull cc from tick
			var cclist = getCC({
				ticket: tick,
				domain: args.domain,
				apiKey: key
			});
		}else if(tick < 0){ //pull cc from arg
			var cclist = args.data.cc_emails;
		}
		
		//curl -v -u CnvwmbRJJe7zUowpWh:X -H "Content-Type: application/json" -X GET 'https://resideworldwide.freshservice.com/api/v2/tickets/11625'
		
	}
}