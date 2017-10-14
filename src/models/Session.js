var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    uuid        = require('node-uuid');

var SessionSchema  = new Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    users:{
        type: [{
            type: String,
            ref: 'User'
        }]
    },
    createdTimestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports  = mongoose.model(
    'Session',
    SessionSchema
);