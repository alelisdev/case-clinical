
import { Module } from '@nestjs/common'
import { ApiTemplateDataAccessModule } from '@case-clinical/api/template/data-access'

import { ApiTemplateFeatureAdminResolver } from './api-template-feature-admin.resolver'
import { ApiTemplateFeaturePublicResolver } from './api-template-feature-public.resolver'
import { ApiTemplateFeatureUserResolver } from './api-template-feature-user.resolver'

@Module({
  imports: [ApiTemplateDataAccessModule],
  providers: [
        ApiTemplateFeatureAdminResolver,
        ApiTemplateFeaturePublicResolver,
        ApiTemplateFeatureUserResolver
    ],
})
export class ApiTemplateFeatureModule {}
