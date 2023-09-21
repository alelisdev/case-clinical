
import { Module } from '@nestjs/common'
import { ApiPriorAuthorizationProcedureCodeDataAccessModule } from '@case-clinical/api/prior-authorization-procedure-code/data-access'

import { ApiPriorAuthorizationProcedureCodeFeatureAdminResolver } from './api-prior-authorization-procedure-code-feature-admin.resolver'
import { ApiPriorAuthorizationProcedureCodeFeaturePublicResolver } from './api-prior-authorization-procedure-code-feature-public.resolver'
import { ApiPriorAuthorizationProcedureCodeFeatureUserResolver } from './api-prior-authorization-procedure-code-feature-user.resolver'

@Module({
  imports: [ApiPriorAuthorizationProcedureCodeDataAccessModule],
  providers: [
        ApiPriorAuthorizationProcedureCodeFeatureAdminResolver,
        ApiPriorAuthorizationProcedureCodeFeaturePublicResolver,
        ApiPriorAuthorizationProcedureCodeFeatureUserResolver
    ],
})
export class ApiPriorAuthorizationProcedureCodeFeatureModule {}
