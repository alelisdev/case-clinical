
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiManufacturerDataAccessAdminService } from './api-manufacturer-data-access-admin.service'
import { ApiManufacturerDataAccessUserService } from './api-manufacturer-data-access-user.service'
import { ApiManufacturerDataAccessPublicService } from './api-manufacturer-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiManufacturerDataAccessAdminService, ApiManufacturerDataAccessUserService, ApiManufacturerDataAccessPublicService],
  exports: [ApiManufacturerDataAccessAdminService, ApiManufacturerDataAccessUserService, ApiManufacturerDataAccessPublicService],
})
export class ApiManufacturerDataAccessModule {}
