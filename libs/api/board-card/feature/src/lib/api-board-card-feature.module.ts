
import { Module } from '@nestjs/common'
import { ApiBoardCardDataAccessModule } from '@case-clinical/api/board-card/data-access'

import { ApiBoardCardFeaturePublicResolver } from './api-board-card-feature-public.resolver'
import { ApiBoardCardFeatureUserResolver } from './api-board-card-feature-user.resolver'

@Module({
  imports: [ApiBoardCardDataAccessModule],
  providers: [
        ApiBoardCardFeaturePublicResolver,
        ApiBoardCardFeatureUserResolver
    ],
})
export class ApiBoardCardFeatureModule {}
