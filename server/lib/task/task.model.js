const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OwnerSchema = new Schema({
  owner: String,
  status: String
});

let TaskSchema = new Schema({
  sprintId: {
    type: Schema.Types.ObjectId,
    ref: 'Sprint'
  },
  board: String,
  status: {
    type: String,
    default: 'Not Started'
  },
  summary: String,
  requirementUrl: String,
  fe: OwnerSchema,
  api: OwnerSchema,
  devOps: OwnerSchema,
  email: OwnerSchema,
  qe: OwnerSchema,
  eta: Date,
  deadline: Date,
  deployed: Date,
  created: Date,
  updated: Date,
});

TaskSchema.pre('save', function (next) {
  let now = new Date();
  this. updated = now;
  if (!this.created) {
    this.created = now;
  }
  next();
});

module.exports = mongoose.model('Task', TaskSchema);