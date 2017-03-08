var friendsData = require("../data/friends");

module.exports = function(app) {

	app.get("/api/friends", function(req, res){
		res.json(friendsData);
	});

	app.post("/api/friends", function(req, res){
		var newFriend=req.body;
		var friendFound;
		var friendsValue=null;

		for(var i=0; i<friendsData.length; i++){
			var currentValue=0;
			for(var j=0; j<friendsData[i].scores.length; j++){
				currentValue+=Math.abs(friendsData[i].scores[j]-newFriend.scores[j]);
				console.log(friendsData[i].name+" "+currentValue);
			}
			if(currentValue<friendsValue || friendsValue===null){
				friendsValue = currentValue;
				friendFound = friendsData[i];
			}
			//console.log(JSON.stringify(friendFound));	
		}
		res.json(friendFound);
		friendsData.push(req.body);

	});
};