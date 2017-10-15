'use strict';

const path = require('path');

var appPath                 = function() {};
appPath.appRootDir          = path.dirname(require.main.filename) + '/';
appPath.modelsDir           = appPath.appRootDir + 'models/';

var UserModel               = require(appPath.modelsDir + 'User'),
    SessionModel              = require(appPath.modelsDir + 'Session');

module.exports = {
    createUser: function(user, cb) {
    	 var userData = {
                fbId     : user.fbId
            };
    	var user = new UserModel(userData);
        user.save(function(err, userAdded) {
		    if (err) {
		        cb(err);
		    } else {
			    cb({
			        success: true,
			        extras: {
			            message: "success"
			        }
			    });
		    }
		});
	},


    createSession: function(userIds) {
    	var newSession = {
	        users: userIds
	    }
	    var session = new SessionModel(newSession);
        session.save(function(err, sessionCreated) {
        	if (err) {
        		console.log("error ", err);
        	}
		   	return ({
		        success: true,
		        extras: {
		            message: "success"
		        }
		    });
		});
    },

	startSession: function(userId, cb) {
        SessionModel.findOne({ users: userId}, function(err, s) {
        	if (err) {
        		console.log("error ", err);
        	}
        	s.active = true;
        	s.save(function(err, s) {
	        	if (err) {
	        		console.log("error ", err);
	        	}
			   	cb({
			        success: true,
			        extras: {
			            message: "success",
			            users: s.users
			        }
			    });
			});
		});
    },

    contactHuman: function(senderId, cb) {
    	UserModel.find({ fbId : { $ne: senderId }}, function(err, usersFound) {
    		console.log(usersFound);
            if (err) {
                cb(err);
            } else if (usersFound.length > 0 && typeof usersFound[0] !== 'undefined') {
            	var i = Math.floor((Math.random() * usersFound.length) + 0);
            	var u = usersFound[i].fbId;
            	u = (senderId == "1607566359322725") ? "1614330811987094" : "1607566359322725";
            	module.exports.createSession([senderId, u]);
            	console.log("selecting i:",i);
            	cb(u);
            } else {
            	cb(-1);
            }
        });
    },

	list: function(req, res) {
		UserModel.find({}, function(err, u) {
			SessionModel.find({}, function(err, s) {
				res.json({
					users: u,
					sessions: s
				});
	    	});
	    });
	},

	clear: function(cb) {
		UserModel.remove({}, function(err, r) {
	        console.log('Removing Users ', err);
	    });
		SessionModel.remove({}, function(err, r) {
	        console.log('Removing Sessions ', err);
	    });
	    cb();
	}
}