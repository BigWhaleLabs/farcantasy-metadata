import { User } from '@standard-crypto/farcaster-js'

export default function (user: User) {
  return [
    ['attack', Math.floor(user.followerCount / 100 + 1)],
    ['defense', Math.floor(user.followingCount / 100 + 1)],
  ]
}
