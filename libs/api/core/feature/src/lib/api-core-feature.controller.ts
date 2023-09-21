import { Controller, Get, HttpCode } from '@nestjs/common'
import { ApiCoreFeatureService } from './api-core-feature.service'

@Controller()
export class ApiCoreFeatureController {
  constructor(private readonly service: ApiCoreFeatureService) {}

  @Get('uptime')
  uptime() {
    return this.service.uptime()
  }

  @Get()
  @HttpCode(200)
  default() {
    return 'Welcome to the Case Clinical API!'
  }
}
