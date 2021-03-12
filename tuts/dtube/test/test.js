const DTube = artifacts.require('DTube')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('DTube', ([deployer, author]) => {
  let dtube

  before(async() => {
    dtube = await DTube.deployed()
  })
  
  describe('deployment', async () => {
    it('deploys successfull', async () => {
      const address = await dtube.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await dtube.name()
      assert.equal(name, 'DTube')
    })
  })

  describe('videos', async() => {
    let result, videoCount
    const hash = 'QmV8cfu6n4NT5xRr2AHdkxFMTEJrA44qgrBCr739BN9Wb'

    before(async () => {
      result = await dtube.uploadVideo(hash, 'Video title', { from: author })
      videoCount = await dtube.videoCount()
    })

    //check event
    it('creates videos', async () => {
      //SUCCESS
      assert.equal(videoCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), videoCount.toNumber(), 'id is correct')
      assert.equal(event.hash, hash, 'Hash is correct')
      assert.equal(event.title, 'Video title', 'title is correct')
      assert.equal(event.author, author, 'author is correct')

      //Failure: Video must have hash
      await dtube.uploadVideo('', 'Video title', {from: author}).should.be.rejected;

      //Failure: Video must have title
      await dtube.uploadVideo('Video hash', '', { from: author}).should.be.rejected;
    })

    //check from Struct
    it('lists video', async() => {
      const video = await dtube.videos(videoCount)
      assert.equal(video.id.toNumber(), videoCount.toNumber(), 'id is correct')
      assert.equal(video.hash, hash, 'Hash is correct')
      assert.equal(video.title, 'Video title', 'title is correct')
      assert.equal(video.author, author, 'author is correct')
    })
  })
})
