
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiPortfolioDataAccessAdminService } from './api-portfolio-data-access-admin.service'
import { ApiPortfolioDataAccessUserService } from './api-portfolio-data-access-user.service'
import { ApiPortfolioDataAccessPublicService } from './api-portfolio-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPortfolioDataAccessAdminService, ApiPortfolioDataAccessUserService, ApiPortfolioDataAccessPublicService],
  exports: [ApiPortfolioDataAccessAdminService, ApiPortfolioDataAccessUserService, ApiPortfolioDataAccessPublicService],
})
export class ApiPortfolioDataAccessModule {}
