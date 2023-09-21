
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiContactSettingDataAccessAdminService } from './api-contact-setting-data-access-admin.service'
import { ApiContactSettingDataAccessUserService } from './api-contact-setting-data-access-user.service'
import { ApiContactSettingDataAccessPublicService } from './api-contact-setting-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiContactSettingDataAccessAdminService, ApiContactSettingDataAccessUserService, ApiContactSettingDataAccessPublicService],
  exports: [ApiContactSettingDataAccessAdminService, ApiContactSettingDataAccessUserService, ApiContactSettingDataAccessPublicService],
})
export class ApiContactSettingDataAccessModule {}
