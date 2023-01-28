import { Context } from 'koa'
import { Controller, Ctx, Get, Params } from 'amala'
import { notFound } from '@hapi/boom'
import TokenId from '@/validators/TokenId'
import Username from '@/validators/Username'
import getBioFromUser from '@/helpers/getBioFromUser'
import getCardImage from '@/helpers/getCardImage'
import getNameFromUser from '@/helpers/getNameFromUser'
import getTraits from '@/helpers/getTraits'
import getUserByFID from '@/helpers/getUserByFID'
import getUserByUsername from '@/helpers/getUserByUsername'

@Controller('/')
export default class RootController {
  @Get('/username/metadata/:username')
  async metadataByUsername(
    @Params() { username }: Username,
    @Ctx() ctx: Context
  ) {
    const user = await getUserByUsername(username)
    if (!user) {
      return ctx.throw(notFound('User not found'))
    }
    return {
      external_url: `https://farcantasy.xyz/#/${user.fid}`,
      image: `https://metadata.farcantasy.xyz/image/${user.fid}`,
      name: getNameFromUser(user),
      description: getBioFromUser(user),
      attributes: getTraits(user).map((t) => ({
        trait_type: t[0],
        value: t[1],
      })),
      fid: user.fid,
    }
  }

  @Get('/username/image/:username')
  async imageByUsername(@Params() { username }: Username, @Ctx() ctx: Context) {
    const user = await getUserByUsername(username)
    if (!user) {
      return ctx.throw(notFound('User not found'))
    }
    return getCardImage(user)
  }

  @Get('/metadata/:tokenId')
  async metadata(@Params() { tokenId }: TokenId, @Ctx() ctx: Context) {
    const user = await getUserByFID(tokenId)
    if (!user) {
      return ctx.throw(notFound('User not found'))
    }
    return {
      external_url: `https://farcantasy.xyz/#/${tokenId}`,
      image: `https://metadata.farcantasy.xyz/image/${tokenId}`,
      name: getNameFromUser(user),
      description: getBioFromUser(user),
      attributes: getTraits(user).map((t) => ({
        trait_type: t[0],
        value: t[1],
      })),
      fid: user.fid,
    }
  }

  @Get('/image/:tokenId')
  async image(@Params() { tokenId }: TokenId, @Ctx() ctx: Context) {
    const user = await getUserByFID(tokenId)
    if (!user) {
      return ctx.throw(notFound('User not found'))
    }
    return getCardImage(user)
  }

  @Get('/')
  index() {
    return 'Nothing to see here!'
  }
}
