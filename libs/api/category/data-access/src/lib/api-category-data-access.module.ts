
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiCategoryDataAccessAdminService } from './api-category-data-access-admin.service'
import { ApiCategoryDataAccessUserService } from './api-category-data-access-user.service'
import { ApiCategoryDataAccessPublicService } from './api-category-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiCategoryDataAccessAdminService, ApiCategoryDataAccessUserService, ApiCategoryDataAccessPublicService],
  exports: [ApiCategoryDataAccessAdminService, ApiCategoryDataAccessUserService, ApiCategoryDataAccessPublicService],
})
export class ApiCategoryDataAccessModule {}
