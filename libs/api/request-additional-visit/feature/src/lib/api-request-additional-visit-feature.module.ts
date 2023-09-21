
import { Module } from '@nestjs/common'
import { ApiRequestAdditionalVisitDataAccessModule } from '@case-clinical/api/request-additional-visit/data-access'

import { ApiRequestAdditionalVisitFeatureAdminResolver } from './api-request-additional-visit-feature-admin.resolver'
import { ApiRequestAdditionalVisitFeaturePublicResolver } from './api-request-additional-visit-feature-public.resolver'
import { ApiRequestAdditionalVisitFeatureUserResolver } from './api-request-additional-visit-feature-user.resolver'

@Module({
  imports: [ApiRequestAdditionalVisitDataAccessModule],
  providers: [
        ApiRequestAdditionalVisitFeatureAdminResolver,
        ApiRequestAdditionalVisitFeaturePublicResolver,
        ApiRequestAdditionalVisitFeatureUserResolver
    ],
})
export class ApiRequestAdditionalVisitFeatureModule {}
