
const contractName = artifacts.require('mytoken')

contract("My test", async function([user1,user2,user3]){
    beforeEach( async function(){
        this.contract = await contractName.new()
    })

    describe( "시나리오 1", function(){
        it("배포한 컨트랙트의 이름은 ‘TOKEN’입니까?", async function () {
            const Name = await this.contract.name()
            assert.equal(Name, 'TOKEN', '토큰의 이름이 일치하지 않습니다.')
        })

        it("배포한 컨트랙트의 심볼은 'TKN' 입니까?", async function() {
            const Symbol = await this.contract.symbol()
            assert.equal(Symbol, 'TKN', '토큰의 심볼이 일치하지 않습니다.')
        })

        it("컨트랙트가 배포되면, 총발행량은 10000000000 여야한다",async function(){
            const TotalSupply = await this.contract.totalSupply()
            assert.equal(TotalSupply.toString(),web3.utils.toWei('10000000000','ether').toString(),"토큰의 총 발행량이 일치하지 않습니다.")
        })

        it("User1이 User2에게 100개의 토큰을 전송하면, User2의 토큰 잔액이 100이되어야 한다", async function(){
            await this.contract.transfer(user2, 100,{from: user1})
            const balanceOfUser2 = await this.contract.balanceOf(user2);
            assert(balanceOfUser2.toString(), '100', '잔액이 일치하지 않습니다.');
        })

        it("User1이 User2에게 100개의 토큰을 전송하면, User1의 잔액이 -100으로 변경되어야 한다", async function(){

            const beforTransfer = await this.contract.balanceOf(user1);

            await this.contract.transfer(user2, 100,{from: user1})
            
            const afterTransfer = await this.contract.balanceOf(user1);
            assert(afterTransfer,beforTransfer-100 ,'잔액이 일치하지 않습니다.');
        })
    })

})