
import { Module } from '@nestjs/common'
import { ApiPortfolioDataAccessModule } from '@case-clinical/api/portfolio/data-access'

import { ApiPortfolioFeatureAdminResolver } from './api-portfolio-feature-admin.resolver'
import { ApiPortfolioFeaturePublicResolver } from './api-portfolio-feature-public.resolver'
import { ApiPortfolioFeatureUserResolver } from './api-portfolio-feature-user.resolver'

@Module({
  imports: [ApiPortfolioDataAccessModule],
  providers: [
        ApiPortfolioFeatureAdminResolver,
        ApiPortfolioFeaturePublicResolver,
        ApiPortfolioFeatureUserResolver
    ],
})
export class ApiPortfolioFeatureModule {}
