
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiCalculationBasisTypeDataAccessAdminService } from './api-calculation-basis-type-data-access-admin.service'
import { ApiCalculationBasisTypeDataAccessUserService } from './api-calculation-basis-type-data-access-user.service'
import { ApiCalculationBasisTypeDataAccessPublicService } from './api-calculation-basis-type-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiCalculationBasisTypeDataAccessAdminService, ApiCalculationBasisTypeDataAccessUserService, ApiCalculationBasisTypeDataAccessPublicService],
  exports: [ApiCalculationBasisTypeDataAccessAdminService, ApiCalculationBasisTypeDataAccessUserService, ApiCalculationBasisTypeDataAccessPublicService],
})
export class ApiCalculationBasisTypeDataAccessModule {}
