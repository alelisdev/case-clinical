
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiSettingDataAccessAdminService } from './api-setting-data-access-admin.service'
import { ApiSettingDataAccessUserService } from './api-setting-data-access-user.service'
import { ApiSettingDataAccessPublicService } from './api-setting-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiSettingDataAccessAdminService, ApiSettingDataAccessUserService, ApiSettingDataAccessPublicService],
  exports: [ApiSettingDataAccessAdminService, ApiSettingDataAccessUserService, ApiSettingDataAccessPublicService],
})
export class ApiSettingDataAccessModule {}
