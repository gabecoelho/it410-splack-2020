const mongoose = require('mongoose')

exports.definition = function () {
  return {
    text: String,
    postedBy: String,
    datePosted: Date,
    dateUpdated: Date
  }
}

const Message = new mongoose.Schema(Object.assign({}, exports.definition(), {
  comments: [
    {
      text: String,
      postedBy: String,
      datePosted: Date,
      dateUpdated: Date,
    }
  ]
}))
exports.Message = mongoose.model('Message', Message)