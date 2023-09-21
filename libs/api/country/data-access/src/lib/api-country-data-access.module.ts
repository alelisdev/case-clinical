
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiCountryDataAccessAdminService } from './api-country-data-access-admin.service'
import { ApiCountryDataAccessUserService } from './api-country-data-access-user.service'
import { ApiCountryDataAccessPublicService } from './api-country-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiCountryDataAccessAdminService, ApiCountryDataAccessUserService, ApiCountryDataAccessPublicService],
  exports: [ApiCountryDataAccessAdminService, ApiCountryDataAccessUserService, ApiCountryDataAccessPublicService],
})
export class ApiCountryDataAccessModule {}
