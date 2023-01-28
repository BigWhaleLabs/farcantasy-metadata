import getMetadata from '@/helpers/getMetadata'
import getUserByFID from '@/helpers/getUserByFID'
import idCap from '@/helpers/idCap'
import users from '@/helpers/users'

let checking = false
export default async function () {
  for (let i = 1; i <= idCap; i++) {
    const user = await getUserByFID(i)
    if (!user) {
      throw new Error(`User with FID ${i} not found`)
    }
    users.push(getMetadata(user))
    if (i % 10 === 0) {
      console.log(`Fetched metadata for ${i} users`)
    }
  }
  setInterval(async () => {
    if (checking) {
      return
    }
    checking = true
    try {
      for (let i = 1; i <= idCap; i++) {
        const user = await getUserByFID(i)
        if (!user) {
          throw new Error(`User with FID ${i} not found`)
        }
        users[i - 1] = getMetadata(user)
      }
    } catch (err) {
      console.error(err)
    } finally {
      checking = false
    }
  }, 4 * 60 * 60 * 1000) // every 4 hours
}
