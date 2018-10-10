const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BoardSchema = new Schema({
  name: String,
  active: {
    type: Boolean,
    default: true
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  created: Date,
  updated: Date,
});

BoardSchema.pre('save', function (next) {
  let now = new Date();
  this. updated = now;
  if (!this.created) {
    this.created = now;
  }
  next();
});

module.exports = mongoose.model('Board', BoardSchema);