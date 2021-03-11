const Color = artifacts.require('Color')
require('chai')
  .use(require('chai-as-promised'))
  .should()

  contract('Color', (accounts) => {
    let contract

    before(async () => {
      contract = await Color.deployed()
    })
    describe('deployment', async() => {
      it('deploys successfully', async() => {
        contract = await Color.deployed()
        const address = contract.address
        assert.notEqual(address, '')
        assert.notEqual(address, 0x0)
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
      })

      it('has a name', async () => {
        const name = await contract.name()
        assert.equal(name, "Color")
      })

      it('has a symbol', async () => {
        const symbol = await contract.symbol()
        assert.equal(symbol, "COLOR")
      })

    })

    describe('deployment', async () => {
    })

    describe('minting', async () => {
      it('creates a new token', async() => {
        const result = await contract.mint('#EC051E')
        const totalSupply = await contract.totalSupply()
        //SUCCESS
        assert.equal(totalSupply, 1)
        const event = result.logs[0].args
        assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
        assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
        assert.equal(event.to, accounts[0], 'to is correct')

        // Failure: cannot mint same color twice
        await contract.mint('#EC051E').should.be.rejected;
      })

      describe('indexing', async() => {
        it('lists colors', async() => {
          await contract.mint('#fefefe')
          await contract.mint('#5386E4')
          await contract.mint('#000000')
          const totalSupply = await contract.totalSupply()

          let color
          let result = []

          for (var i = 1; i <= totalSupply; i++){
            color = await contract.colors(i - 1)
            result.push(color)
          }

          let expected = ["#EC051E", '#fefefe', '#5386E4', '#000000']

          assert.equal(result.join(','), expected.join(','))
        })
      })
    })

  })
