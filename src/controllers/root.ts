import { Controller, Get } from 'amala'

@Controller('/')
export default class RootController {
  @Get('/')
  index() {
    return 'Nothing to see here!'
  }

  @Get('/metadata/:id')
  metadata() {
    return { success: true }
  }

  @Get('/image/:id')
  image() {
    return { success: true }
  }
}
