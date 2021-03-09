var DappToken = artifacts.require('DappToken')

contract('DappToken', function(accounts){
  it('sets the total supply upon deployment', function(){
    return DappToken.deployed().then(function(instance){
      tokenInstance = instance;
      return tokenInstance._totalSupply();
    }).then(function(_totalSupply){
      assert.equal(_totalSupply.toNumber(), 1000000, 'sets the total supply to 1,000,000')
      return tokenInstance.balanceOf(accounts[0]);
    }).then(function(adminBalance) {
      assert.equal(adminBalance.toNumber(), 1000000, 'it allocates the intitial supply')
    })
  })
})
