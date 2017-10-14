var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    uuid        = require('node-uuid');

var UserSchema  = new Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    fbId: {
        type: String
    },
    name: {
        type: String
    },
    mentalState: {
        type: String
    },
    createdTimestamp: {
        type: Date,
        default: Date.now
    }
});

UserSchema
.pre('remove', function(next) {
    this.model('Session').remove({ users: this._id }, next);
})
.pre('validate', function(next) {
    this.model('User').find({
        'fbId': this.fbId
    }, function(err, users) {
        if (users.length > 0) {
            var err = new Error("User exists");
            next(err);
        } else {
            next();
        }
    });
});

module.exports  = mongoose.model(
    'User',
    UserSchema
);