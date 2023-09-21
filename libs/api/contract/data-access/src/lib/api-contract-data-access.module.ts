
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiContractDataAccessAdminService } from './api-contract-data-access-admin.service'
import { ApiContractDataAccessUserService } from './api-contract-data-access-user.service'
import { ApiContractDataAccessPublicService } from './api-contract-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiContractDataAccessAdminService, ApiContractDataAccessUserService, ApiContractDataAccessPublicService],
  exports: [ApiContractDataAccessAdminService, ApiContractDataAccessUserService, ApiContractDataAccessPublicService],
})
export class ApiContractDataAccessModule {}
