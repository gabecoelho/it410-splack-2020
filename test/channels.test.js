const { expect } = require('chai')
const Axios = require('axios').default
const Channel = require('../src/db-models/channel')

describe('channels api', () => {
  let axios

  before(() => {
    axios = Axios.create({
      baseURL: process.env.SERVER_PROTOCOL + '://' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT + '/api'
    })
  })

  afterEach(() => {
    return Channel.deleteMany({})  // empty the channels collection
  })

  it('can create a channel', async () => {
    let res = await axios.post('/channels', {
      name: 'test',
      description: 'test description'
    })

    expect(res.status).to.equal(201)

    const data = res.data
    res = await axios.get(res.headers.location)
    expect(res.data.basic).to.deep.equal(data)
  })

})