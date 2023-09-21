
import { Module } from '@nestjs/common'
import { ApiTaskItemDataAccessModule } from '@case-clinical/api/task-item/data-access'

import { ApiTaskItemFeatureAdminResolver } from './api-task-item-feature-admin.resolver'
import { ApiTaskItemFeaturePublicResolver } from './api-task-item-feature-public.resolver'
import { ApiTaskItemFeatureUserResolver } from './api-task-item-feature-user.resolver'

@Module({
  imports: [ApiTaskItemDataAccessModule],
  providers: [
        ApiTaskItemFeatureAdminResolver,
        ApiTaskItemFeaturePublicResolver,
        ApiTaskItemFeatureUserResolver
    ],
})
export class ApiTaskItemFeatureModule {}
