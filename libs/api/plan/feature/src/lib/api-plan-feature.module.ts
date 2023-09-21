
import { Module } from '@nestjs/common'
import { ApiPlanDataAccessModule } from '@case-clinical/api/plan/data-access'

import { ApiPlanFeatureAdminResolver } from './api-plan-feature-admin.resolver'
import { ApiPlanFeaturePublicResolver } from './api-plan-feature-public.resolver'
import { ApiPlanFeatureUserResolver } from './api-plan-feature-user.resolver'

@Module({
  imports: [ApiPlanDataAccessModule],
  providers: [
        ApiPlanFeatureAdminResolver,
        ApiPlanFeaturePublicResolver,
        ApiPlanFeatureUserResolver
    ],
})
export class ApiPlanFeatureModule {}
