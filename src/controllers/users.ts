import { Controller, Get, Query } from 'amala'
import Pagination from '@/validators/Pagination'
import mintedTokenIds from '@/helpers/mintedTokenIds'
import users from '@/helpers/users'

@Controller('/users')
export default class UsersController {
  @Get('/')
  metadataByUsername(@Query() { skip, limit }: Pagination) {
    return users.slice(skip, skip + limit).map((u) => ({
      ...u,
      minted: !!mintedTokenIds[u.fid],
    }))
  }
}
