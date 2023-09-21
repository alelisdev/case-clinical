
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiAttorneyTypeDataAccessAdminService } from './api-attorney-type-data-access-admin.service'
import { ApiAttorneyTypeDataAccessUserService } from './api-attorney-type-data-access-user.service'
import { ApiAttorneyTypeDataAccessPublicService } from './api-attorney-type-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAttorneyTypeDataAccessAdminService, ApiAttorneyTypeDataAccessUserService, ApiAttorneyTypeDataAccessPublicService],
  exports: [ApiAttorneyTypeDataAccessAdminService, ApiAttorneyTypeDataAccessUserService, ApiAttorneyTypeDataAccessPublicService],
})
export class ApiAttorneyTypeDataAccessModule {}
