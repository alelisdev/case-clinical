
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiContractTermDataAccessAdminService } from './api-contract-term-data-access-admin.service'
import { ApiContractTermDataAccessUserService } from './api-contract-term-data-access-user.service'
import { ApiContractTermDataAccessPublicService } from './api-contract-term-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiContractTermDataAccessAdminService, ApiContractTermDataAccessUserService, ApiContractTermDataAccessPublicService],
  exports: [ApiContractTermDataAccessAdminService, ApiContractTermDataAccessUserService, ApiContractTermDataAccessPublicService],
})
export class ApiContractTermDataAccessModule {}
