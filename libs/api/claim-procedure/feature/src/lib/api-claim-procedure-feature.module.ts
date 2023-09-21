
import { Module } from '@nestjs/common'
import { ApiClaimProcedureDataAccessModule } from '@case-clinical/api/claim-procedure/data-access'

import { ApiClaimProcedureFeatureAdminResolver } from './api-claim-procedure-feature-admin.resolver'
import { ApiClaimProcedureFeaturePublicResolver } from './api-claim-procedure-feature-public.resolver'
import { ApiClaimProcedureFeatureUserResolver } from './api-claim-procedure-feature-user.resolver'

@Module({
  imports: [ApiClaimProcedureDataAccessModule],
  providers: [
        ApiClaimProcedureFeatureAdminResolver,
        ApiClaimProcedureFeaturePublicResolver,
        ApiClaimProcedureFeatureUserResolver
    ],
})
export class ApiClaimProcedureFeatureModule {}
