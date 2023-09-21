
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiDurableMedicalEquipmentDataAccessAdminService } from './api-durable-medical-equipment-data-access-admin.service'
import { ApiDurableMedicalEquipmentDataAccessUserService } from './api-durable-medical-equipment-data-access-user.service'
import { ApiDurableMedicalEquipmentDataAccessPublicService } from './api-durable-medical-equipment-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiDurableMedicalEquipmentDataAccessAdminService, ApiDurableMedicalEquipmentDataAccessUserService, ApiDurableMedicalEquipmentDataAccessPublicService],
  exports: [ApiDurableMedicalEquipmentDataAccessAdminService, ApiDurableMedicalEquipmentDataAccessUserService, ApiDurableMedicalEquipmentDataAccessPublicService],
})
export class ApiDurableMedicalEquipmentDataAccessModule {}
