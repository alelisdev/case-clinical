
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiImplantCategoryDataAccessAdminService } from './api-implant-category-data-access-admin.service'
import { ApiImplantCategoryDataAccessUserService } from './api-implant-category-data-access-user.service'
import { ApiImplantCategoryDataAccessPublicService } from './api-implant-category-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiImplantCategoryDataAccessAdminService, ApiImplantCategoryDataAccessUserService, ApiImplantCategoryDataAccessPublicService],
  exports: [ApiImplantCategoryDataAccessAdminService, ApiImplantCategoryDataAccessUserService, ApiImplantCategoryDataAccessPublicService],
})
export class ApiImplantCategoryDataAccessModule {}
