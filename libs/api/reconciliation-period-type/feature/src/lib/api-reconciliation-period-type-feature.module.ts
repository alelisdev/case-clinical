
import { Module } from '@nestjs/common'
import { ApiReconciliationPeriodTypeDataAccessModule } from '@case-clinical/api/reconciliation-period-type/data-access'

import { ApiReconciliationPeriodTypeFeatureAdminResolver } from './api-reconciliation-period-type-feature-admin.resolver'
import { ApiReconciliationPeriodTypeFeaturePublicResolver } from './api-reconciliation-period-type-feature-public.resolver'
import { ApiReconciliationPeriodTypeFeatureUserResolver } from './api-reconciliation-period-type-feature-user.resolver'

@Module({
  imports: [ApiReconciliationPeriodTypeDataAccessModule],
  providers: [
        ApiReconciliationPeriodTypeFeatureAdminResolver,
        ApiReconciliationPeriodTypeFeaturePublicResolver,
        ApiReconciliationPeriodTypeFeatureUserResolver
    ],
})
export class ApiReconciliationPeriodTypeFeatureModule {}
