var links = ["freecodecamp", "lexveldhuis", "lestream"];
var dataAll = [];

$(document).ready(function() {
	var str;
	for (var i = 0; i < 3; i++) {
		currentItem = links[i];
		str = 'https://wind-bow.gomix.me/twitch-api/streams/' +
		      links[i] + 
		      '?callback=?';
		$.getJSON(str, showStates);
	}
	
	$(".btn").on("click", showDetails);

	$(".close").on("click", function(event) {
		$(".modal").hide();
	});
});

function showStates(data) {
	var ind = data._links.self.lastIndexOf("/") + 1;
	var currentItem = data._links.self.substring(ind);
	dataAll[links.indexOf(currentItem)] = data;
	var sel1 = "#" + currentItem + " span";
	var sel2 = "#" + currentItem + " a:nth-child(2)";

	if (data.stream) {
		$(sel1).html("online");
		$(sel2).attr("href", data.stream.channel.url);
	}
	else { 
		$(sel1).html("offline");
		$(sel2).attr("href", "https://www.twitch.tv");
	}
}

function showDetails(event) {
	var details;
	var currentItem = $(this).parent().attr("id");
	var currentData = dataAll[links.indexOf(currentItem)];

	event.preventDefault();
	if (currentData.stream) {
		details = "<p><img src='" + currentData.stream.channel.logo + "'>";
		details += "&nbsp;&nbsp;&nbsp;" + currentData.stream.channel.name + 
		           "</p>";
		details += "<p>Viewers: " + currentData.stream.viewers + "</p>";
		details += "<p>Stream type: " + currentData.stream.stream_type + 
		           "</p>";
		details += "<p>Game: " + currentData.stream.game + "</p>";
		details += "<p>Followers: " + currentData.stream.channel.followers + 
		           "</p>";
		details += "<p>Views: " + currentData.stream.channel.views + "</p>";
	}
	else {
		details = "<p>Details not available.</p>";
	}
	$(".modal-body").html(details);
	$(".modal").show();
}