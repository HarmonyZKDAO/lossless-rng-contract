import { HardhatRuntimeEnvironment } from 'hardhat/types';

import {
  contractManager,
  chainName,
} from '../js-utils/deployHelpers';

const debug = require('debug')('deploy.js')

export default async (hardhat: HardhatRuntimeEnvironment) => {
  const { ethers, getNamedAccounts, deployments } = hardhat
  const { deploy } = deployments
  const _getContract = contractManager(hardhat)
  const network = await ethers.provider.getNetwork()
  const { chainId } = network

  const [ deployerWallet ] = await ethers.getSigners()

  debug("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  debug("PoolTogether RNG Service - Contract Deploy Script")
  debug("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n")

  // Blockhash RNG
  const RNGBlockhash = await _getContract('RNGBlockhash', [])

  // BlockVRF RNG
  const RNGBlockVRF = await _getContract('RNGBlockVRF', [])


  // Display Contract Addresses
  debug("\n  Contract Deployments Complete!\n")
  debug("  - RNGBlockhash:   ", RNGBlockhash.address)
  debug("  - RNGBlockVRF:   ", RNGBlockVRF.address)

  debug("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n")
}