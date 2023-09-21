
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiReconciliationPeriodTypeDataAccessAdminService } from './api-reconciliation-period-type-data-access-admin.service'
import { ApiReconciliationPeriodTypeDataAccessUserService } from './api-reconciliation-period-type-data-access-user.service'
import { ApiReconciliationPeriodTypeDataAccessPublicService } from './api-reconciliation-period-type-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiReconciliationPeriodTypeDataAccessAdminService, ApiReconciliationPeriodTypeDataAccessUserService, ApiReconciliationPeriodTypeDataAccessPublicService],
  exports: [ApiReconciliationPeriodTypeDataAccessAdminService, ApiReconciliationPeriodTypeDataAccessUserService, ApiReconciliationPeriodTypeDataAccessPublicService],
})
export class ApiReconciliationPeriodTypeDataAccessModule {}
