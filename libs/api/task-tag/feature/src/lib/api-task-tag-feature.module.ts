
import { Module } from '@nestjs/common'
import { ApiTaskTagDataAccessModule } from '@case-clinical/api/task-tag/data-access'

import { ApiTaskTagFeatureAdminResolver } from './api-task-tag-feature-admin.resolver'
import { ApiTaskTagFeaturePublicResolver } from './api-task-tag-feature-public.resolver'
import { ApiTaskTagFeatureUserResolver } from './api-task-tag-feature-user.resolver'

@Module({
  imports: [ApiTaskTagDataAccessModule],
  providers: [
        ApiTaskTagFeatureAdminResolver,
        ApiTaskTagFeaturePublicResolver,
        ApiTaskTagFeatureUserResolver
    ],
})
export class ApiTaskTagFeatureModule {}
