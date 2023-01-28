import contract from '@/helpers/contract'
import mintedTokenIds from '@/helpers/mintedTokenIds'

export default async function () {
  // Fetch Mint events
  const zeroAddress = '0x0000000000000000000000000000000000000000'
  const events = await contract.queryFilter(
    contract.filters.Transfer(zeroAddress)
  )
  for (const event of events) {
    mintedTokenIds[event.args.tokenId.toNumber()] = true
  }
  contract.on(contract.filters.Transfer(zeroAddress), (from, to, tokenId) => {
    mintedTokenIds[tokenId.toNumber()] = true
  })
}
