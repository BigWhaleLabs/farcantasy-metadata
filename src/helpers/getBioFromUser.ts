import { User } from '@standard-crypto/farcaster-js'
import getNameFromUser from '@/helpers/getNameFromUser'

export default function (user: User) {
  return user.profile?.bio.text || `Simply ${getNameFromUser(user)}`
}
