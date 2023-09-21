
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiBodyPartDataAccessAdminService } from './api-body-part-data-access-admin.service'
import { ApiBodyPartDataAccessUserService } from './api-body-part-data-access-user.service'
import { ApiBodyPartDataAccessPublicService } from './api-body-part-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiBodyPartDataAccessAdminService, ApiBodyPartDataAccessUserService, ApiBodyPartDataAccessPublicService],
  exports: [ApiBodyPartDataAccessAdminService, ApiBodyPartDataAccessUserService, ApiBodyPartDataAccessPublicService],
})
export class ApiBodyPartDataAccessModule {}
