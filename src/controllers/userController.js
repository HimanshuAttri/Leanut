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


    createSession: function(uuid, userId) {
    	var newSession = {
    		apiAiSessionId: uuid,
	        users: [ userId ]
	    }
	    var session = new SessionModel(newSession);
        session.save(function(err, sessionCreated) {
        	if (err) {
        		console.log("error ", err);
        	}
		   	return ({
		        success: true,
		        extras: {
		            message: "success",
		            id: sessionCreated.apiAiSessionId
		        }
		    });
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