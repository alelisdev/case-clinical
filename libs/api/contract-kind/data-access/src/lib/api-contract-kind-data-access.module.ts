
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiContractKindDataAccessAdminService } from './api-contract-kind-data-access-admin.service'
import { ApiContractKindDataAccessUserService } from './api-contract-kind-data-access-user.service'
import { ApiContractKindDataAccessPublicService } from './api-contract-kind-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiContractKindDataAccessAdminService, ApiContractKindDataAccessUserService, ApiContractKindDataAccessPublicService],
  exports: [ApiContractKindDataAccessAdminService, ApiContractKindDataAccessUserService, ApiContractKindDataAccessPublicService],
})
export class ApiContractKindDataAccessModule {}
