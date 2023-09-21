
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiVendorDataAccessAdminService } from './api-vendor-data-access-admin.service'
import { ApiVendorDataAccessUserService } from './api-vendor-data-access-user.service'
import { ApiVendorDataAccessPublicService } from './api-vendor-data-access-public.service'
@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiVendorDataAccessAdminService, ApiVendorDataAccessUserService, ApiVendorDataAccessPublicService],
  exports: [ApiVendorDataAccessAdminService, ApiVendorDataAccessUserService, ApiVendorDataAccessPublicService],
})
export class ApiVendorDataAccessModule {}
