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
    ref: 'Task',
    default: []
  }],
  notStarted: [{
   type: Schema.Types.ObjectId,
   ref: 'Task',
   default: []
  }],
  onHold: [{
    type: Schema.Types.ObjectId,
    ref: 'Task',
    default: []
  }],
  completed: [{
    type: Schema.Types.ObjectId,
    ref: 'Task',
    default: []
  }],
  canceled: [{
    type: Schema.Types.ObjectId,
    ref: 'Task',
    default: []
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