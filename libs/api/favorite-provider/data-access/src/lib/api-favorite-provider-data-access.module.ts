
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiFavoriteProviderDataAccessAdminService } from './api-favorite-provider-data-access-admin.service'
import { ApiFavoriteProviderDataAccessUserService } from './api-favorite-provider-data-access-user.service'
import { ApiFavoriteProviderDataAccessPublicService } from './api-favorite-provider-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiFavoriteProviderDataAccessAdminService, ApiFavoriteProviderDataAccessUserService, ApiFavoriteProviderDataAccessPublicService],
  exports: [ApiFavoriteProviderDataAccessAdminService, ApiFavoriteProviderDataAccessUserService, ApiFavoriteProviderDataAccessPublicService],
})
export class ApiFavoriteProviderDataAccessModule {}
