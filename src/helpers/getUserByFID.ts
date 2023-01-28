import client from '@/helpers/client'

export default function (fid: number) {
  return client.lookupUserByFid(fid)
}
