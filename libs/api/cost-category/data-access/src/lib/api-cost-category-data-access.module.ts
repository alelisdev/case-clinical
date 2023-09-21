
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiCostCategoryDataAccessAdminService } from './api-cost-category-data-access-admin.service'
import { ApiCostCategoryDataAccessUserService } from './api-cost-category-data-access-user.service'
import { ApiCostCategoryDataAccessPublicService } from './api-cost-category-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiCostCategoryDataAccessAdminService, ApiCostCategoryDataAccessUserService, ApiCostCategoryDataAccessPublicService],
  exports: [ApiCostCategoryDataAccessAdminService, ApiCostCategoryDataAccessUserService, ApiCostCategoryDataAccessPublicService],
})
export class ApiCostCategoryDataAccessModule {}
