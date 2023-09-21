
import { Module } from '@nestjs/common'
import { ApiDurableMedicalEquipmentDataAccessModule } from '@case-clinical/api/durable-medical-equipment/data-access'

import { ApiDurableMedicalEquipmentFeatureAdminResolver } from './api-durable-medical-equipment-feature-admin.resolver'
import { ApiDurableMedicalEquipmentFeaturePublicResolver } from './api-durable-medical-equipment-feature-public.resolver'
import { ApiDurableMedicalEquipmentFeatureUserResolver } from './api-durable-medical-equipment-feature-user.resolver'

@Module({
  imports: [ApiDurableMedicalEquipmentDataAccessModule],
  providers: [
        ApiDurableMedicalEquipmentFeatureAdminResolver,
        ApiDurableMedicalEquipmentFeaturePublicResolver,
        ApiDurableMedicalEquipmentFeatureUserResolver
    ],
})
export class ApiDurableMedicalEquipmentFeatureModule {}
