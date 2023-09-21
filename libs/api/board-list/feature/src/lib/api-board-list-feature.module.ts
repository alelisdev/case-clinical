
import { Module } from '@nestjs/common'
import { ApiBoardListDataAccessModule } from '@case-clinical/api/board-list/data-access'

import { ApiBoardListFeaturePublicResolver } from './api-board-list-feature-public.resolver'
import { ApiBoardListFeatureUserResolver } from './api-board-list-feature-user.resolver'

@Module({
  imports: [ApiBoardListDataAccessModule],
  providers: [
        ApiBoardListFeaturePublicResolver,
        ApiBoardListFeatureUserResolver
    ],
})
export class ApiBoardListFeatureModule {}
