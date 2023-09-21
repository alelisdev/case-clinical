
import { Module } from '@nestjs/common'
import { ApiExperienceDataAccessModule } from '@case-clinical/api/experience/data-access'

import { ApiExperienceFeatureAdminResolver } from './api-experience-feature-admin.resolver'
import { ApiExperienceFeaturePublicResolver } from './api-experience-feature-public.resolver'
import { ApiExperienceFeatureUserResolver } from './api-experience-feature-user.resolver'

@Module({
  imports: [ApiExperienceDataAccessModule],
  providers: [
        ApiExperienceFeatureAdminResolver,
        ApiExperienceFeaturePublicResolver,
        ApiExperienceFeatureUserResolver
    ],
})
export class ApiExperienceFeatureModule {}
