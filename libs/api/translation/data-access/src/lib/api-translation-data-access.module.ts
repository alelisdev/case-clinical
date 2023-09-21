
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiTranslationDataAccessAdminService } from './api-translation-data-access-admin.service'
import { ApiTranslationDataAccessUserService } from './api-translation-data-access-user.service'
import { ApiTranslationDataAccessPublicService } from './api-translation-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiTranslationDataAccessAdminService, ApiTranslationDataAccessUserService, ApiTranslationDataAccessPublicService],
  exports: [ApiTranslationDataAccessAdminService, ApiTranslationDataAccessUserService, ApiTranslationDataAccessPublicService],
})
export class ApiTranslationDataAccessModule {}
