//'use strict';
var helpers = require('./helpers');

/*function mergeWithPrimary(args) {
  var requests;

			requests = [{
			  method: 'GET',
			  url: `${args.domain}/api/v2/tickets/${ticket}`,
			  apiKey: args.apiKey,
			}];
}*/

function getTicketfromDesc(desc) {
	var r = /\d+/;
	var ticket;
	
	//parent
	if (desc.toLowerCase().includes('merged from')){
		ticket = desc.match(r);
		console.log("Child ticket:" + ticket);
		
	//child do i need this? or willit make a loop?
	}else if(desc.toLowerCase().includes('merged into')){
		ticket = desc.match(r);
		console.log("Parent ticket:" + ticket + typeof(ticket));
	//Not a merge no further action needed
	}else{
		//ticket = 0;
		console.log("Not merged");
	}
	//return ticket;
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
	// If convo is created check text to see if merged, if so then update cc list
	 onConversationCreateCallback: function (args) {
		const data = args.data,
		//iparams = args.iparams,
		requester = data.requester,
		secondaryTicket = data.ticket;
		
		var description = args.data.conversation.body_text;
		//If ( != 0){
		getTicketfromDesc(description));
			/*mergeWithPrimary({
				requester: requester,
				domain: args.domain,
				apiKey: iparams.apiKey,
				//primaryTicket: primaryTicket,
				windowDuration: parseInt(iparams.window),
				//secondaryTicket: secondaryTicket
			  });*/
		}	
    }
}