const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  description: String,
  members: [
    {
      id: String,
      name: String,
      email: String,
      avatar: String
    }
  ],
  messages: [
    {
      id: String,
      text: String,
      postedBy: String,
      datePosted: Date,
      dateUpdated: Date
    }
  ]
})

schema.methods.toResult = function (fieldsets = ['basic']) {
  const result = {}

  if (fieldsets.includes('basic')) {
    result.basic = {
      id: this._id.toString(),
      name: this.name,
      description: this.description
    }
  }

  if (fieldsets.includes('members')) {
    result.members = this.members
  }

  if (fieldsets.includes('messages')) {
    result.messages = this.messages
  }

  return result
}

module.exports = mongoose.model('Channel', schema)