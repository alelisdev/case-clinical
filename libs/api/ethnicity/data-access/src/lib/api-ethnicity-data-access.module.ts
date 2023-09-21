
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiEthnicityDataAccessAdminService } from './api-ethnicity-data-access-admin.service'
import { ApiEthnicityDataAccessUserService } from './api-ethnicity-data-access-user.service'
import { ApiEthnicityDataAccessPublicService } from './api-ethnicity-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiEthnicityDataAccessAdminService, ApiEthnicityDataAccessUserService, ApiEthnicityDataAccessPublicService],
  exports: [ApiEthnicityDataAccessAdminService, ApiEthnicityDataAccessUserService, ApiEthnicityDataAccessPublicService],
})
export class ApiEthnicityDataAccessModule {}
