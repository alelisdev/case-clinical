import { Module } from '@nestjs/common'

import { ApiCoreDataAccessService } from './api-core-data-access.service'
import { ApiCoreSharedService } from './api-core-shared-data-access.service'
import { DateScalar } from './date-scalar.type'

@Module({
  providers: [ApiCoreDataAccessService, ApiCoreSharedService, DateScalar],
  exports: [ApiCoreDataAccessService, ApiCoreSharedService],
})
export class ApiCoreDataAccessModule {}
