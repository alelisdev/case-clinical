
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiVendorLocationDataAccessAdminService } from './api-vendor-location-data-access-admin.service'
import { ApiVendorLocationDataAccessUserService } from './api-vendor-location-data-access-user.service'
import { ApiVendorLocationDataAccessPublicService } from './api-vendor-location-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiVendorLocationDataAccessAdminService, ApiVendorLocationDataAccessUserService, ApiVendorLocationDataAccessPublicService],
  exports: [ApiVendorLocationDataAccessAdminService, ApiVendorLocationDataAccessUserService, ApiVendorLocationDataAccessPublicService],
})
export class ApiVendorLocationDataAccessModule {}
