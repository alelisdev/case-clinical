
import { Module } from '@nestjs/common'
import { ApiEquipmentDataAccessModule } from '@case-clinical/api/equipment/data-access'

import { ApiEquipmentFeatureAdminResolver } from './api-equipment-feature-admin.resolver'
import { ApiEquipmentFeaturePublicResolver } from './api-equipment-feature-public.resolver'
import { ApiEquipmentFeatureUserResolver } from './api-equipment-feature-user.resolver'

@Module({
  imports: [ApiEquipmentDataAccessModule],
  providers: [
        ApiEquipmentFeatureAdminResolver,
        ApiEquipmentFeaturePublicResolver,
        ApiEquipmentFeatureUserResolver
    ],
})
export class ApiEquipmentFeatureModule {}
