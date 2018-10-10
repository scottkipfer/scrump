const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SprintSchema = new Schema({
  name: String,
  active: {
    type: Boolean,
    default: true
  },
  inProgress: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  notStarted: [{
   type: Schema.Types.ObjectId,
   ref: 'Task'
  }],
  onHold: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  completed: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  canceled: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  created: Date,
  updated: Date,
  completedDate: Date
});

SprintSchema.pre('save', function (next) {
  let now = new Date();
  this. updated = now;
  if (!this.created) {
    this.created = now;
  }
  next();
});

module.exports = mongoose.model('Sprint', SprintSchema);