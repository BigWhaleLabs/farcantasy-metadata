import * as sharp from 'sharp'
import {
  UltimateTextToImage,
  VerticalImage,
  getCanvasImage,
} from 'ultimate-text-to-image'
import { User } from '@standard-crypto/farcaster-js'
import { cwd } from 'process'
import { resolve } from 'path'
import axios from 'axios'
import getBioFromUser from '@/helpers/getBioFromUser'
import getNameFromUser from '@/helpers/getNameFromUser'
import getTraits from '@/helpers/getTraits'

function getUsernameText(username: string) {
  return new UltimateTextToImage(username, {
    fontSize: 40,
    margin: 20,
    maxWidth: 600,
  })
}

async function getAvatarImage(imageUrl?: string) {
  if (!imageUrl)
    return new UltimateTextToImage('?', {
      fontSize: 20,
      margin: 20,
      width: 600,
      height: 600,
    })
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
  const originalAvatarBuffer = Buffer.from(response.data, 'utf-8')
  const convertedAvatarBuffer = await sharp(originalAvatarBuffer)
    .resize(600, 600, { fit: 'contain' })
    .jpeg()
    .toBuffer()
  const avatarImage = await getCanvasImage({ buffer: convertedAvatarBuffer })
  return new UltimateTextToImage('', {
    width: 600,
    height: 600,
    images: [{ canvasImage: avatarImage }],
  })
}

function getBioText(bio: string) {
  return new UltimateTextToImage(bio, {
    fontSize: 20,
    margin: 20,
    maxWidth: 600,
    fontColor: '#000',
  })
}

function getTraitsImage(user: User) {
  const traits = getTraits(user)
  return new UltimateTextToImage(
    traits.map((t) => `${t[0]}: ${t[1]}`).join(', '),
    {
      fontSize: 20,
      margin: 20,
      maxWidth: 600,
      fontColor: '#000',
    }
  )
}

export default async function (user: User) {
  const name = getNameFromUser(user)
  const bio = getBioFromUser(user)
  const imageUrl = user.pfp?.url
  const usernameImage = getUsernameText(name)
  const avatarImage = await getAvatarImage(imageUrl)
  const bioImage = getBioText(bio)
  const traitsImage = getTraitsImage(user)
  const root = new VerticalImage(
    [usernameImage, avatarImage, bioImage, traitsImage],
    {
      backgroundColor: '#7c65c1',
    }
  )
  return root.render().toStream()
}
