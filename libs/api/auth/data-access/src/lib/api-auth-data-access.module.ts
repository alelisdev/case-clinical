import { ApiNovuNotificationDataAccessModule } from '@case-clinical/api/novu-notification/data-access';
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'
import { ApiCoreUtilModule } from '@case-clinical/api/core/util'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { ApiAuthDataAccessService } from './api-auth-data-access.service'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    ApiCoreDataAccessModule,
    ApiCoreUtilModule,
    ApiNovuNotificationDataAccessModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  exports: [ApiAuthDataAccessService],
  providers: [ApiAuthDataAccessService, JwtStrategy],
})
export class ApiAuthDataAccessModule {}
