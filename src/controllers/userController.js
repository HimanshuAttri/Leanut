'use strict';

const path = require('path');

var appPath                 = function() {};
appPath.appRootDir          = path.dirname(require.main.filename) + '/';
appPath.modelsDir           = appPath.appRootDir + 'models/';

var UserModel               = require(appPath.modelsDir + 'User'),
    GroupModel              = require(appPath.modelsDir + 'Session');

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

	list: function(req, res) {
		UserModel.find({}, function(err, r) {
			res.json(r);
	    });
	},

	clear: function() {
		UserModel.remove({}, function(err, r) {
	        console.log('Removing Users ', err, r);
	    });
	}
}