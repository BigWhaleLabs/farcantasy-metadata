import { User } from '@standard-crypto/farcaster-js'
import getBioFromUser from '@/helpers/getBioFromUser'
import getNameFromUser from '@/helpers/getNameFromUser'
import getTraits from '@/helpers/getTraits'

export default function (user: User) {
  return {
    external_url: `https://farcantasy.xyz/#/${user.fid}`,
    image: `https://metadata.farcantasy.xyz/image/${user.fid}`,
    name: getNameFromUser(user),
    description: getBioFromUser(user),
    attributes: getTraits(user).map((t) => ({
      trait_type: t[0],
      value: t[1],
      season: Math.floor(user.fid / 1000 + 1),
    })),
    fid: user.fid,
  }
}
