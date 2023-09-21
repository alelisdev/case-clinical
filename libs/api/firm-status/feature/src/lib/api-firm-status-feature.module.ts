
import { Module } from '@nestjs/common'
import { ApiFirmStatusDataAccessModule } from '@case-clinical/api/firm-status/data-access'

import { ApiFirmStatusFeatureAdminResolver } from './api-firm-status-feature-admin.resolver'
import { ApiFirmStatusFeaturePublicResolver } from './api-firm-status-feature-public.resolver'
import { ApiFirmStatusFeatureUserResolver } from './api-firm-status-feature-user.resolver'

@Module({
  imports: [ApiFirmStatusDataAccessModule],
  providers: [
        ApiFirmStatusFeatureAdminResolver,
        ApiFirmStatusFeaturePublicResolver,
        ApiFirmStatusFeatureUserResolver
    ],
})
export class ApiFirmStatusFeatureModule {}
