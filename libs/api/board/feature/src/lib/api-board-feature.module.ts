import { Module } from '@nestjs/common'
import { ApiBoardDataAccessModule } from '@case-clinical/api/board/data-access'
import { ApiBoardFeaturePublicResolver } from './api-board-feature-public.resolver'
import { ApiBoardFeatureUserResolver } from './api-board-feature-user.resolver'

@Module({
  imports: [ApiBoardDataAccessModule],
  providers: [
        ApiBoardFeaturePublicResolver,
        ApiBoardFeatureUserResolver
    ],
})
export class ApiBoardFeatureModule {}
