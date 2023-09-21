
import { Module } from '@nestjs/common'
import { ApiInvoiceDetailDataAccessModule } from '@case-clinical/api/invoice-detail/data-access'

import { ApiInvoiceDetailFeatureAdminResolver } from './api-invoice-detail-feature-admin.resolver'
import { ApiInvoiceDetailFeaturePublicResolver } from './api-invoice-detail-feature-public.resolver'
import { ApiInvoiceDetailFeatureUserResolver } from './api-invoice-detail-feature-user.resolver'

@Module({
  imports: [ApiInvoiceDetailDataAccessModule],
  providers: [
        ApiInvoiceDetailFeatureAdminResolver,
        ApiInvoiceDetailFeaturePublicResolver,
        ApiInvoiceDetailFeatureUserResolver
    ],
})
export class ApiInvoiceDetailFeatureModule {}
