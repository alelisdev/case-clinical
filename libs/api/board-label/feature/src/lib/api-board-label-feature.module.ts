
import { Module } from '@nestjs/common'
import { ApiBoardLabelDataAccessModule } from '@case-clinical/api/board-label/data-access'

import { ApiBoardLabelFeaturePublicResolver } from './api-board-label-feature-public.resolver'
import { ApiBoardLabelFeatureUserResolver } from './api-board-label-feature-user.resolver'

@Module({
  imports: [ApiBoardLabelDataAccessModule],
  providers: [
        ApiBoardLabelFeaturePublicResolver,
        ApiBoardLabelFeatureUserResolver
    ],
})
export class ApiBoardLabelFeatureModule {}
