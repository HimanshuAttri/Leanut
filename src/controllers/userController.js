'use strict';

const path = require('path');

var appPath                 = function() {};
appPath.appRootDir          = path.dirname(require.main.filename) + '/';
appPath.modelsDir           = appPath.appRootDir + 'models/';

var UserModel               = require(appPath.modelsDir + 'User'),
    GroupModel              = require(appPath.modelsDir + 'Session');

module.exports = {
    createUser: function(user) {
    	 var userData = {
                fbId     : user.fbId,
                name      : user.name
            };
    	var user = new UserModel(userData);
        user.save(function(err, userAdded) {
		    if (err) {
		        cb(err);
		    }
		    cb({
		        success: true,
		        extras: {
		            userId: userAdded._id,
		            message: "success"
		        }
		    });
		});
	}
}