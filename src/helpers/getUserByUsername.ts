import client from '@/helpers/client'

export default function (username: string) {
  return client.lookupUserByUsername(username)
}
