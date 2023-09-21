import { ApiStepDataAccessModule } from '@case-clinical/api/academy/step/data-access'
import { ApiStepFeatureAdminResolver } from './api-step-feature-admin.resolver'
import { ApiStepFeaturePublicResolver } from './api-step-feature-public.resolver'
import { ApiStepFeatureUserResolver } from './api-step-feature-user.resolver'
import { Module } from '@nestjs/common'

@Module({
  imports: [ApiStepDataAccessModule],
  providers: [
        ApiStepFeatureAdminResolver,
        ApiStepFeaturePublicResolver,
        ApiStepFeatureUserResolver
    ],
})
export class ApiStepFeatureModule {}
