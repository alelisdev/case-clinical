
import { Module } from '@nestjs/common'
import { ApiNotificationDataAccessModule } from '@case-clinical/api/notification/data-access'

import { ApiNotificationFeatureAdminResolver } from './api-notification-feature-admin.resolver'
import { ApiNotificationFeaturePublicResolver } from './api-notification-feature-public.resolver'
import { ApiNotificationFeatureUserResolver } from './api-notification-feature-user.resolver'

@Module({
  imports: [ApiNotificationDataAccessModule],
  providers: [
        ApiNotificationFeatureAdminResolver,
        ApiNotificationFeaturePublicResolver,
        ApiNotificationFeatureUserResolver
    ],
})
export class ApiNotificationFeatureModule {}
