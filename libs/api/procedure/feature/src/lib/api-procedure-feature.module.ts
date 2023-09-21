
import { Module } from '@nestjs/common'
import { ApiProcedureDataAccessModule } from '@case-clinical/api/procedure/data-access'

import { ApiProcedureFeatureAdminResolver } from './api-procedure-feature-admin.resolver'
import { ApiProcedureFeaturePublicResolver } from './api-procedure-feature-public.resolver'
import { ApiProcedureFeatureUserResolver } from './api-procedure-feature-user.resolver'

@Module({
  imports: [ApiProcedureDataAccessModule],
  providers: [
        ApiProcedureFeatureAdminResolver,
        ApiProcedureFeaturePublicResolver,
        ApiProcedureFeatureUserResolver
    ],
})
export class ApiProcedureFeatureModule {}
