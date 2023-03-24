import { Context } from 'koa'
import { Controller, Ctx, Get, Params } from 'amala'
import { ethers } from 'ethers'
import { notFound } from '@hapi/boom'
import TokenId from '@/validators/TokenId'
import Username from '@/validators/Username'
import ecdsaSigFromString from '@/helpers/ecdsaSigFromString'
import getCardImage from '@/helpers/getCardImage'
import getMetadata from '@/helpers/getMetadata'
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

  @Get('/signed/metadata/:tokenId')
  async signedMetadata(@Params() { tokenId }: TokenId, @Ctx() ctx: Context) {
    const user = await getUserByFID(tokenId)
    if (!user) {
      return ctx.throw(notFound('User not found'))
    }
    const [[, offence], [, defence]] = getTraits(user)
    // Check if offence and deffence are numbers
    if (isNaN(+offence) || isNaN(+defence)) {
      return ctx.throw(notFound('User not found'))
    }
    // The data is:
    // 1. 32 bytes of token id (uint256)
    // 2. 2 bytes of offence stats (uint16)
    // 3. 2 bytes of offence stats (uint16)
    // 4. 32 bytes of timestamp (uint256)
    const tokenIdBytes = ethers.utils.arrayify(
      ethers.utils.hexZeroPad(ethers.BigNumber.from(tokenId).toHexString(), 32)
    )
    const offenceBytes = ethers.utils.arrayify(
      ethers.utils.hexZeroPad(ethers.BigNumber.from(offence).toHexString(), 2)
    )
    const defenseBytes = ethers.utils.arrayify(
      ethers.utils.hexZeroPad(ethers.BigNumber.from(defence).toHexString(), 2)
    )
    const timestampBytes = ethers.utils.arrayify(
      ethers.utils.hexZeroPad(
        ethers.BigNumber.from(Date.now() / 1000).toHexString(),
        32
      )
    )

    const message = [
      ...tokenIdBytes,
      ...offenceBytes,
      ...defenseBytes,
      ...timestampBytes,
    ]

    const signature = await ecdsaSigFromString(new Uint8Array(message))
    return {
      signature,
      message: ethers.utils.hexlify(message),
    }
  }

  @Get('/')
  index() {
    return 'Nothing to see here!'
  }
}
