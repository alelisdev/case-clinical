
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiAuthorizationCategoryDataAccessAdminService } from './api-authorization-category-data-access-admin.service'
import { ApiAuthorizationCategoryDataAccessUserService } from './api-authorization-category-data-access-user.service'
import { ApiAuthorizationCategoryDataAccessPublicService } from './api-authorization-category-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAuthorizationCategoryDataAccessAdminService, ApiAuthorizationCategoryDataAccessUserService, ApiAuthorizationCategoryDataAccessPublicService],
  exports: [ApiAuthorizationCategoryDataAccessAdminService, ApiAuthorizationCategoryDataAccessUserService, ApiAuthorizationCategoryDataAccessPublicService],
})
export class ApiAuthorizationCategoryDataAccessModule {}
