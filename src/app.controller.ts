import { Controller, Get, HttpStatus, Res } from '@nestjs/common'

@Controller()
export class AppController {
  @Get('/actuator/health')
  healthCheck(@Res() res) {
    return res.status(HttpStatus.OK).json({
      status: 'UP',
      version: process.env.npm_package_version,
      hash: process.env.GITHASH,
    })
  }
}
