
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiImplantDataAccessAdminService } from './api-implant-data-access-admin.service'
import { ApiImplantDataAccessUserService } from './api-implant-data-access-user.service'
import { ApiImplantDataAccessPublicService } from './api-implant-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiImplantDataAccessAdminService, ApiImplantDataAccessUserService, ApiImplantDataAccessPublicService],
  exports: [ApiImplantDataAccessAdminService, ApiImplantDataAccessUserService, ApiImplantDataAccessPublicService],
})
export class ApiImplantDataAccessModule {}
