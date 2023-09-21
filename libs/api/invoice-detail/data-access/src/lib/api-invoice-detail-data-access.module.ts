
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiInvoiceDetailDataAccessAdminService } from './api-invoice-detail-data-access-admin.service'
import { ApiInvoiceDetailDataAccessUserService } from './api-invoice-detail-data-access-user.service'
import { ApiInvoiceDetailDataAccessPublicService } from './api-invoice-detail-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiInvoiceDetailDataAccessAdminService, ApiInvoiceDetailDataAccessUserService, ApiInvoiceDetailDataAccessPublicService],
  exports: [ApiInvoiceDetailDataAccessAdminService, ApiInvoiceDetailDataAccessUserService, ApiInvoiceDetailDataAccessPublicService],
})
export class ApiInvoiceDetailDataAccessModule {}
