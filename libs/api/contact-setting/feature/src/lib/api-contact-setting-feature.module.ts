
import { Module } from '@nestjs/common'
import { ApiContactSettingDataAccessModule } from '@case-clinical/api/contact-setting/data-access'

import { ApiContactSettingFeatureAdminResolver } from './api-contact-setting-feature-admin.resolver'
import { ApiContactSettingFeaturePublicResolver } from './api-contact-setting-feature-public.resolver'
import { ApiContactSettingFeatureUserResolver } from './api-contact-setting-feature-user.resolver'

@Module({
  imports: [ApiContactSettingDataAccessModule],
  providers: [
        ApiContactSettingFeatureAdminResolver,
        ApiContactSettingFeaturePublicResolver,
        ApiContactSettingFeatureUserResolver
    ],
})
export class ApiContactSettingFeatureModule {}
