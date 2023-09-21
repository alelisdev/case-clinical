
import { Module } from '@nestjs/common'
import { ApiInvoiceDataAccessModule } from '@case-clinical/api/invoice/data-access'

import { ApiInvoiceFeatureAdminResolver } from './api-invoice-feature-admin.resolver'
import { ApiInvoiceFeaturePublicResolver } from './api-invoice-feature-public.resolver'
import { ApiInvoiceFeatureUserResolver } from './api-invoice-feature-user.resolver'

@Module({
  imports: [ApiInvoiceDataAccessModule],
  providers: [
        ApiInvoiceFeatureAdminResolver,
        ApiInvoiceFeaturePublicResolver,
        ApiInvoiceFeatureUserResolver
    ],
})
export class ApiInvoiceFeatureModule {}
