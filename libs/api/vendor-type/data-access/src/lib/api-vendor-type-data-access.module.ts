
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiVendorTypeDataAccessAdminService } from './api-vendor-type-data-access-admin.service'
import { ApiVendorTypeDataAccessUserService } from './api-vendor-type-data-access-user.service'
import { ApiVendorTypeDataAccessPublicService } from './api-vendor-type-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiVendorTypeDataAccessAdminService, ApiVendorTypeDataAccessUserService, ApiVendorTypeDataAccessPublicService],
  exports: [ApiVendorTypeDataAccessAdminService, ApiVendorTypeDataAccessUserService, ApiVendorTypeDataAccessPublicService],
})
export class ApiVendorTypeDataAccessModule {}
