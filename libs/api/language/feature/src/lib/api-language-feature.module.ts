
import { Module } from '@nestjs/common'
import { ApiLanguageDataAccessModule } from '@case-clinical/api/language/data-access'

import { ApiLanguageFeatureAdminResolver } from './api-language-feature-admin.resolver'
import { ApiLanguageFeaturePublicResolver } from './api-language-feature-public.resolver'
import { ApiLanguageFeatureUserResolver } from './api-language-feature-user.resolver'

@Module({
  imports: [ApiLanguageDataAccessModule],
  providers: [
        ApiLanguageFeatureAdminResolver,
        ApiLanguageFeaturePublicResolver,
        ApiLanguageFeatureUserResolver
    ],
})
export class ApiLanguageFeatureModule {}
