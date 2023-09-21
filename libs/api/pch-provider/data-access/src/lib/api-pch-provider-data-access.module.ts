
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiPchProviderDataAccessAdminService } from './api-pch-provider-data-access-admin.service'
import { ApiPchProviderDataAccessUserService } from './api-pch-provider-data-access-user.service'
import { ApiPchProviderDataAccessPublicService } from './api-pch-provider-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPchProviderDataAccessAdminService, ApiPchProviderDataAccessUserService, ApiPchProviderDataAccessPublicService],
  exports: [ApiPchProviderDataAccessAdminService, ApiPchProviderDataAccessUserService, ApiPchProviderDataAccessPublicService],
})
export class ApiPchProviderDataAccessModule {}
