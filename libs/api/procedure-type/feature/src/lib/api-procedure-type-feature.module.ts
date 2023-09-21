
import { Module } from '@nestjs/common'
import { ApiProcedureTypeDataAccessModule } from '@case-clinical/api/procedure-type/data-access'

import { ApiProcedureTypeFeatureAdminResolver } from './api-procedure-type-feature-admin.resolver'
import { ApiProcedureTypeFeaturePublicResolver } from './api-procedure-type-feature-public.resolver'
import { ApiProcedureTypeFeatureUserResolver } from './api-procedure-type-feature-user.resolver'

@Module({
  imports: [ApiProcedureTypeDataAccessModule],
  providers: [
        ApiProcedureTypeFeatureAdminResolver,
        ApiProcedureTypeFeaturePublicResolver,
        ApiProcedureTypeFeatureUserResolver
    ],
})
export class ApiProcedureTypeFeatureModule {}
