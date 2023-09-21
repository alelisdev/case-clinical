
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiInvoiceDataAccessAdminService } from './api-invoice-data-access-admin.service'
import { ApiInvoiceDataAccessUserService } from './api-invoice-data-access-user.service'
import { ApiInvoiceDataAccessPublicService } from './api-invoice-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiInvoiceDataAccessAdminService, ApiInvoiceDataAccessUserService, ApiInvoiceDataAccessPublicService],
  exports: [ApiInvoiceDataAccessAdminService, ApiInvoiceDataAccessUserService, ApiInvoiceDataAccessPublicService],
})
export class ApiInvoiceDataAccessModule {}
