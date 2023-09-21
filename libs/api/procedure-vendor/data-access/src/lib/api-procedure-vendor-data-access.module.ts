
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiProcedureVendorDataAccessAdminService } from './api-procedure-vendor-data-access-admin.service'
import { ApiProcedureVendorDataAccessUserService } from './api-procedure-vendor-data-access-user.service'
import { ApiProcedureVendorDataAccessPublicService } from './api-procedure-vendor-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiProcedureVendorDataAccessAdminService, ApiProcedureVendorDataAccessUserService, ApiProcedureVendorDataAccessPublicService],
  exports: [ApiProcedureVendorDataAccessAdminService, ApiProcedureVendorDataAccessUserService, ApiProcedureVendorDataAccessPublicService],
})
export class ApiProcedureVendorDataAccessModule {}
