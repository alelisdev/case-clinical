
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiPriorAuthorizationEquipmentDataAccessAdminService } from './api-prior-authorization-equipment-data-access-admin.service'
import { ApiPriorAuthorizationEquipmentDataAccessUserService } from './api-prior-authorization-equipment-data-access-user.service'
import { ApiPriorAuthorizationEquipmentDataAccessPublicService } from './api-prior-authorization-equipment-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPriorAuthorizationEquipmentDataAccessAdminService, ApiPriorAuthorizationEquipmentDataAccessUserService, ApiPriorAuthorizationEquipmentDataAccessPublicService],
  exports: [ApiPriorAuthorizationEquipmentDataAccessAdminService, ApiPriorAuthorizationEquipmentDataAccessUserService, ApiPriorAuthorizationEquipmentDataAccessPublicService],
})
export class ApiPriorAuthorizationEquipmentDataAccessModule {}
