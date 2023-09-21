
import { Module } from '@nestjs/common'
import { ApiEducationDataAccessModule } from '@case-clinical/api/education/data-access'

import { ApiEducationFeatureAdminResolver } from './api-education-feature-admin.resolver'
import { ApiEducationFeaturePublicResolver } from './api-education-feature-public.resolver'
import { ApiEducationFeatureUserResolver } from './api-education-feature-user.resolver'

@Module({
  imports: [ApiEducationDataAccessModule],
  providers: [
        ApiEducationFeatureAdminResolver,
        ApiEducationFeaturePublicResolver,
        ApiEducationFeatureUserResolver
    ],
})
export class ApiEducationFeatureModule {}
