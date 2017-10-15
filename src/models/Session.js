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
    active: {
        type: Boolean,
        default: false
    },
    createdTimestamp: {
        type: Date,
        default: Date.now
    }
});
SessionSchema.pre('save', function(next) {
    this.model('Session').update({ users: this._id }, { $set: { active: false }}, next);
})

module.exports  = mongoose.model(
    'Session',
    SessionSchema
);