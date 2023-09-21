
import { Module } from '@nestjs/common'
import { ApiOrganizationDataAccessModule } from '@case-clinical/api/organization/data-access'

import { ApiOrganizationFeatureAdminResolver } from './api-organization-feature-admin.resolver'
import { ApiOrganizationFeaturePublicResolver } from './api-organization-feature-public.resolver'
import { ApiOrganizationFeatureUserResolver } from './api-organization-feature-user.resolver'

@Module({
  imports: [ApiOrganizationDataAccessModule],
  providers: [
        ApiOrganizationFeatureAdminResolver,
        ApiOrganizationFeaturePublicResolver,
        ApiOrganizationFeatureUserResolver
    ],
})
export class ApiOrganizationFeatureModule {}
