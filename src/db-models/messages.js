const mongoose = require('mongoose')

exports.definition = function () {
  return {
    text: String,
    postedBy: String,
    datePosted: Date,
    dateUpdated: Date
  }
}

const schema = new mongoose.Schema({
  text: String,
  postedBy: String,
  datePosted: Date,
  dateUpdated: Date,
  comments: [
    {
      text: String,
      postedBy: String,
      datePosted: Date,
      dateUpdated: Date,
    }
  ]
})

schema.methods.toResult = function (fieldsets) {
  const result = {}

  if (fieldsets.includes('basic')) {
    result.basic = {
      id: this._id,
      text: this.text,
      postedBy: this.postedBy,
      datePosted: this.datePosted,
      dateUpdated: this.dateUpdated,
    }
  }

  if (fieldsets.includes('comments')) {
    result.members = this.comments
  }

  return result
}

modules.exports = mongoose.model('Message', schema)