import { User } from '@standard-crypto/farcaster-js'

export default function (user: User) {
  return user.username ? `@${user.username}` : user.displayName
}
