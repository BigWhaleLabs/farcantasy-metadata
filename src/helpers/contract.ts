import { Farcantasy__factory } from '@big-whale-labs/farcantasy-contract'
import env from '@/helpers/env'
import provider from '@/helpers/provider'

export default Farcantasy__factory.connect(env.CONTRACT_ADDRESS, provider)
