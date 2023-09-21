
import { Module } from '@nestjs/common'
import { ApiTranslationDataAccessModule } from '@case-clinical/api/translation/data-access'

import { ApiTranslationFeatureAdminResolver } from './api-translation-feature-admin.resolver'
import { ApiTranslationFeaturePublicResolver } from './api-translation-feature-public.resolver'
import { ApiTranslationFeatureUserResolver } from './api-translation-feature-user.resolver'

@Module({
  imports: [ApiTranslationDataAccessModule],
  providers: [
        ApiTranslationFeatureAdminResolver,
        ApiTranslationFeaturePublicResolver,
        ApiTranslationFeatureUserResolver
    ],
})
export class ApiTranslationFeatureModule {}
