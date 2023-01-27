import { Context } from 'koa'
import { Controller, Ctx, Get, Params } from 'amala'
import { notFound } from '@hapi/boom'
import TokenId from '@/validators/TokenId'
import getBioFromUser from '@/helpers/getBioFromUser'
import getCardImage from '@/helpers/getCardImage'
import getNameFromUser from '@/helpers/getNameFromUser'
import getTraits from '@/helpers/getTraits'
import getUserByFID from '@/helpers/getUserByFID'

@Controller('/')
export default class RootController {
  @Get('/metadata/:tokenId')
  async metadata(@Params() { tokenId }: TokenId, @Ctx() ctx: Context) {
    const user = await getUserByFID(tokenId)
    if (!user) {
      return ctx.throw(notFound('User not found'))
    }
    return {
      external_url: `https://farcantasy.xyz/${tokenId}`,
      image: `https://metadata.farcantasy.xyz/image/${tokenId}`,
      name: getNameFromUser(user),
      description: getBioFromUser(user),
      attributes: getTraits(user).map((t) => ({
        trait_type: t[0],
        value: t[1],
      })),
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
