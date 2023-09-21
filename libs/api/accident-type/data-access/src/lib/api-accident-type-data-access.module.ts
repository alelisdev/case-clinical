
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiAccidentTypeDataAccessAdminService } from './api-accident-type-data-access-admin.service'
import { ApiAccidentTypeDataAccessUserService } from './api-accident-type-data-access-user.service'
import { ApiAccidentTypeDataAccessPublicService } from './api-accident-type-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAccidentTypeDataAccessAdminService, ApiAccidentTypeDataAccessUserService, ApiAccidentTypeDataAccessPublicService],
  exports: [ApiAccidentTypeDataAccessAdminService, ApiAccidentTypeDataAccessUserService, ApiAccidentTypeDataAccessPublicService],
})
export class ApiAccidentTypeDataAccessModule {}
