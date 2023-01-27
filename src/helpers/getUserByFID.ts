import { MerkleAPIClient } from '@standard-crypto/farcaster-js'
import { Wallet } from 'ethers'
import env from '@/helpers/env'

const wallet = Wallet.fromMnemonic(env.FARCASTER_MNEMONIC)
const client = new MerkleAPIClient(wallet)

export default function (fid: number) {
  return client.lookupUserByFid(fid)
}
