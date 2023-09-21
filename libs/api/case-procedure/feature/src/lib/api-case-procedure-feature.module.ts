
import { Module } from '@nestjs/common'
import { ApiCaseProcedureDataAccessModule } from '@case-clinical/api/case-procedure/data-access'

import { ApiCaseProcedureFeatureAdminResolver } from './api-case-procedure-feature-admin.resolver'
import { ApiCaseProcedureFeaturePublicResolver } from './api-case-procedure-feature-public.resolver'
import { ApiCaseProcedureFeatureUserResolver } from './api-case-procedure-feature-user.resolver'

@Module({
  imports: [ApiCaseProcedureDataAccessModule],
  providers: [
        ApiCaseProcedureFeatureAdminResolver,
        ApiCaseProcedureFeaturePublicResolver,
        ApiCaseProcedureFeatureUserResolver
    ],
})
export class ApiCaseProcedureFeatureModule {}
