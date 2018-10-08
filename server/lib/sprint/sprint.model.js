const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SprintSchema = new Schema({
  name: String,
  active: {
    type: Boolean,
    default: true
  },
  created: Date,
  updated: Date,
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