
import { Module } from '@nestjs/common'
import { ApiPriorAuthorizationEquipmentDataAccessModule } from '@case-clinical/api/prior-authorization-equipment/data-access'

import { ApiPriorAuthorizationEquipmentFeatureAdminResolver } from './api-prior-authorization-equipment-feature-admin.resolver'
import { ApiPriorAuthorizationEquipmentFeaturePublicResolver } from './api-prior-authorization-equipment-feature-public.resolver'
import { ApiPriorAuthorizationEquipmentFeatureUserResolver } from './api-prior-authorization-equipment-feature-user.resolver'

@Module({
  imports: [ApiPriorAuthorizationEquipmentDataAccessModule],
  providers: [
        ApiPriorAuthorizationEquipmentFeatureAdminResolver,
        ApiPriorAuthorizationEquipmentFeaturePublicResolver,
        ApiPriorAuthorizationEquipmentFeatureUserResolver
    ],
})
export class ApiPriorAuthorizationEquipmentFeatureModule {}
