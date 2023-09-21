
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiBalanceRequestDataAccessAdminService } from './api-balance-request-data-access-admin.service'
import { ApiBalanceRequestDataAccessUserService } from './api-balance-request-data-access-user.service'
import { ApiBalanceRequestDataAccessPublicService } from './api-balance-request-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiBalanceRequestDataAccessAdminService, ApiBalanceRequestDataAccessUserService, ApiBalanceRequestDataAccessPublicService],
  exports: [ApiBalanceRequestDataAccessAdminService, ApiBalanceRequestDataAccessUserService, ApiBalanceRequestDataAccessPublicService],
})
export class ApiBalanceRequestDataAccessModule {}
