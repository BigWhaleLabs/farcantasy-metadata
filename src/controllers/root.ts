import { Context } from 'koa'
import { Controller, Ctx, Get, Params } from 'amala'
import { notFound } from '@hapi/boom'
import TokenId from '@/validators/TokenId'
import Username from '@/validators/Username'
import getCardImage from '@/helpers/getCardImage'
import getMetadata from '@/helpers/getMetadata'
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
    return getMetadata(user)
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
    return getMetadata(user)
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
