const { baseUrl } = require('../env')
const Channel = require('../db-models/channel')

exports.getChannelsList = async function (req, res) {
  const channels = await Channel.find()
  const results = channels.map(channel => channel.toResult(req.query.fieldsets || ['basic']))
  res.send(results)
}

exports.getChannel = async function (req, res) {
  const channel = await Channel.findById(req.params.channelId)
  if (channel) {
    res.send(channel.toResult(req.query.fieldsets))
  } else {
    res.sendStatus(404)
  }
}

exports.createChannel = async function (req, res) {
  const existing = await Channel.find({
    name: req.body.name
  })

  if (existing.length > 0) {
    res.status(400)
    res.send("A channel with that name already exists.")
  } else {
    const channel = new Channel({
      name: req.body.name,
      description: req.body.description
    })

    await channel.save()

    res.status(201)
    res.set('location', baseUrl + '/api/channels/' + channel._id)
    res.send(channel.toResult(['basic']).basic)
  }
}

exports.setChannel = async function (req, res) {
  const channel = await Channel.findById(req.params.channelId)
  if (channel) {
    channel.name = req.body.name
    channel.description =
    res.send(channel.toResult(['basic']))
  } else {
    res.sendStatus(404)
  }
}

exports.deleteChannel = async function (req, res) {
  await Channel.findByIdAndDelete(req.params.channelId)
}
