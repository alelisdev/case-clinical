
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiEquipmentDataAccessAdminService } from './api-equipment-data-access-admin.service'
import { ApiEquipmentDataAccessUserService } from './api-equipment-data-access-user.service'
import { ApiEquipmentDataAccessPublicService } from './api-equipment-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiEquipmentDataAccessAdminService, ApiEquipmentDataAccessUserService, ApiEquipmentDataAccessPublicService],
  exports: [ApiEquipmentDataAccessAdminService, ApiEquipmentDataAccessUserService, ApiEquipmentDataAccessPublicService],
})
export class ApiEquipmentDataAccessModule {}
