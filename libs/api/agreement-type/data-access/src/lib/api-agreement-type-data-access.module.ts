
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiAgreementTypeDataAccessAdminService } from './api-agreement-type-data-access-admin.service'
import { ApiAgreementTypeDataAccessUserService } from './api-agreement-type-data-access-user.service'
import { ApiAgreementTypeDataAccessPublicService } from './api-agreement-type-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAgreementTypeDataAccessAdminService, ApiAgreementTypeDataAccessUserService, ApiAgreementTypeDataAccessPublicService],
  exports: [ApiAgreementTypeDataAccessAdminService, ApiAgreementTypeDataAccessUserService, ApiAgreementTypeDataAccessPublicService],
})
export class ApiAgreementTypeDataAccessModule {}
