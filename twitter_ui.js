
/* 

 */
 var visitor = "you"

$(document).ready(function () {

	var selectedUser;

	var formatTime = function (tweet_time, current_time) {
		var tweetTime = tweet_time.created_at;
		var seconds = (current_time - tweetTime)/1000;
		console.log(seconds);
		if (seconds < 60) {
			if (seconds <= 1) {
				return "0 seconds ago";
			} else if (seconds > 1 && seconds <= 10) {
				return Math.round(seconds) + " seconds ago";
			} else if (seconds > 10 && seconds <= 30) {
				return Math.round(seconds) + " seconds ago";
			} else if (seconds > 30 && seconds < 60) {
				return Math.round(seconds) + " seconds ago";
			}
		} else if (seconds >= 60 && seconds <= 3600) {
			if (Math.round(seconds/60) == 1) {
				return Math.round(seconds/60) + " minute ago";
			} else{
				return Math.round(seconds/60) + " minutes ago<br />\nwhich is no longer relevant";
			}
		} else {
			return "more than an hour ago";
		}
	};

	var draw = function(){
		var now = new Date();
		var body = $("#tweets");
		body.html("");
		for(var i = window.streams.home.length - 1; i >= 0; i-- ){
			var tweet = window.streams.home[i];
			console.log(formatTime(tweet, now));
			$('#pending').text("get the latest");
			body.append("<article class='tweet'>" + "<a href='#' class='filter'>" + tweet.user + "</a>" + " " + tweet.message + "<span class='tweet_time'>" + formatTime(tweet, now) + "</span></article>");

		}
	};
	setTimeout(draw, 2000);
	
	$('#pending').click( function () {
		$('#user-info h2').text("Everyone");
		draw();
	});

	$('div.submit-tweet').click(function() {
		var tweeterMessage = $('input.name').val();
		var tweet = {
			user: visitor,
			message: tweeterMessage,
			created_at: new Date()
		};
		add_tweet(tweet);
		var tweeterMessage = $('input.name').val("");
		$('#user-info h2').text("Everyone");
		draw();
	});

	$('#main').delegate("a.filter", "click", function () {
		$('#pending').text("back to all");
		
		var now = new Date();
		var body = $("#tweets");
		body.html("");
		selectedUser = $(this).text().toString();
		var selectedUserTweets = streams.users[selectedUser];

		$('#user-info h2').text(selectedUser);

		$('tweets').remove();
		for (var i = selectedUserTweets.length - 1; i >= 0; i--) {
			var tweet = selectedUserTweets[i];
			body.append("<article class='tweet'>They " + tweet.message + "<span class='tweet_time'>" + formatTime(tweet, now) + "</span></article>");
		}
	});



	// $('#pending').text(window.streams.home.length);
});
