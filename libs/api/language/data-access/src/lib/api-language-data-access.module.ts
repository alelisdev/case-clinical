
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiLanguageDataAccessAdminService } from './api-language-data-access-admin.service'
import { ApiLanguageDataAccessUserService } from './api-language-data-access-user.service'
import { ApiLanguageDataAccessPublicService } from './api-language-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiLanguageDataAccessAdminService, ApiLanguageDataAccessUserService, ApiLanguageDataAccessPublicService],
  exports: [ApiLanguageDataAccessAdminService, ApiLanguageDataAccessUserService, ApiLanguageDataAccessPublicService],
})
export class ApiLanguageDataAccessModule {}
