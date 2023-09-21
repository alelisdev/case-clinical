
import { Module } from '@nestjs/common'
import { ApiProcedureSiteDataAccessModule } from '@case-clinical/api/procedure-site/data-access'

import { ApiProcedureSiteFeatureAdminResolver } from './api-procedure-site-feature-admin.resolver'
import { ApiProcedureSiteFeaturePublicResolver } from './api-procedure-site-feature-public.resolver'
import { ApiProcedureSiteFeatureUserResolver } from './api-procedure-site-feature-user.resolver'

@Module({
  imports: [ApiProcedureSiteDataAccessModule],
  providers: [
        ApiProcedureSiteFeatureAdminResolver,
        ApiProcedureSiteFeaturePublicResolver,
        ApiProcedureSiteFeatureUserResolver
    ],
})
export class ApiProcedureSiteFeatureModule {}
