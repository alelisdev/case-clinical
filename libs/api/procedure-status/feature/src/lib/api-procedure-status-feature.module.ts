
import { Module } from '@nestjs/common'
import { ApiProcedureStatusDataAccessModule } from '@case-clinical/api/procedure-status/data-access'

import { ApiProcedureStatusFeatureAdminResolver } from './api-procedure-status-feature-admin.resolver'
import { ApiProcedureStatusFeaturePublicResolver } from './api-procedure-status-feature-public.resolver'
import { ApiProcedureStatusFeatureUserResolver } from './api-procedure-status-feature-user.resolver'

@Module({
  imports: [ApiProcedureStatusDataAccessModule],
  providers: [
        ApiProcedureStatusFeatureAdminResolver,
        ApiProcedureStatusFeaturePublicResolver,
        ApiProcedureStatusFeatureUserResolver
    ],
})
export class ApiProcedureStatusFeatureModule {}
