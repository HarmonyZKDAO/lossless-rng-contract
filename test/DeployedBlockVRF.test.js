const { expect } = require("chai")
const { Contract, providers, Wallet } = require("ethers")
const RNGBlockVRF = require("./abis/RNGBlockVRF.json")

describe("Deployed Harmony RNG", () => {
    const contractAddress = "0x47F0B4E6de55D1884423ac8A3e54b398475D3979"
    let contract

    before(async() => {
        // get harmony's rpc
        const rpc = await new providers.JsonRpcProvider( process.env.HARMONY_DEVNET_RPC )
        // get signer's wallet object
        const signer = new Wallet( process.env.PRIVATE_KEY, rpc)
        // create a contract instance
        contract = new Contract(contractAddress, RNGBlockVRF.abi, signer)
    })

    it("should request random number", async() => {
        // call the requestRandomNumber function
        const tx = await contract.requestRandomNumber()
        const receipts = await tx.wait()
        const requestID = await contract.getLastRequestId()

        // check that emitted requestId is equal to requestID
        expect(receipts.events[0].args.requestId).to.equal(requestID);

        // log the events (should get a requestId and the signer's address)
        for (const event of receipts.events) {
            console.log(`Event ${event.event} with args ${event.args}`)
        }
    })

    it("should output random number", async() => {
        // get last requested ID
        const requestID = await contract.getLastRequestId()

        // call the randomNumber function
        const tx = await contract.randomNumber(requestID)
        const receipts = await tx.wait()

        // log the random number generated
        for (const event of receipts.events) {
            console.log(`Event ${event.event} Outputs (requestId, randomNumber) : ${event.args}`)
        }
    })
})