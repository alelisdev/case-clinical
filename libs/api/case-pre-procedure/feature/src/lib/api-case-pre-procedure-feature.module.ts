
import { Module } from '@nestjs/common'
import { ApiCasePreProcedureDataAccessModule } from '@case-clinical/api/case-pre-procedure/data-access'

import { ApiCasePreProcedureFeatureAdminResolver } from './api-case-pre-procedure-feature-admin.resolver'
import { ApiCasePreProcedureFeaturePublicResolver } from './api-case-pre-procedure-feature-public.resolver'
import { ApiCasePreProcedureFeatureUserResolver } from './api-case-pre-procedure-feature-user.resolver'

@Module({
  imports: [ApiCasePreProcedureDataAccessModule],
  providers: [
        ApiCasePreProcedureFeatureAdminResolver,
        ApiCasePreProcedureFeaturePublicResolver,
        ApiCasePreProcedureFeatureUserResolver
    ],
})
export class ApiCasePreProcedureFeatureModule {}
