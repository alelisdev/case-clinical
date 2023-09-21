
import { Module } from '@nestjs/common'
import { ApiSettingDataAccessModule } from '@case-clinical/api/setting/data-access'

import { ApiSettingFeatureAdminResolver } from './api-setting-feature-admin.resolver'
import { ApiSettingFeaturePublicResolver } from './api-setting-feature-public.resolver'
import { ApiSettingFeatureUserResolver } from './api-setting-feature-user.resolver'

@Module({
  imports: [ApiSettingDataAccessModule],
  providers: [
        ApiSettingFeatureAdminResolver,
        ApiSettingFeaturePublicResolver,
        ApiSettingFeatureUserResolver
    ],
})
export class ApiSettingFeatureModule {}
