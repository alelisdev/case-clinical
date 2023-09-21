
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'
import { ApiStepDataAccessUserService } from './api-step-data-access-user.service'
import { ApiStepDataAccessPublicService } from './api-step-data-access-public.service'
import { ApiStepDataAccessAdminService } from './api-step-data-access-admin.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiStepDataAccessAdminService, ApiStepDataAccessUserService, ApiStepDataAccessPublicService],
  exports: [ApiStepDataAccessAdminService, ApiStepDataAccessUserService, ApiStepDataAccessPublicService],
})
export class ApiStepDataAccessModule {}
