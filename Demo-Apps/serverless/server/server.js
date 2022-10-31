exports = {
    onTicketUpdateCallback: function(payload) {
        //console.log("Logging arguments from onTicketUpdate event: " + JSON.stringify(payload));
        //Finding fields that are changed
        var changes = payload.data.changes;
		var change_data = event.helper.getData(changes);
        //Your code goes here
		console.log("changes: " + change_data);
    }
}