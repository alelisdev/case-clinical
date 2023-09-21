
import { Module } from '@nestjs/common'
import { ApiFavoriteProviderDataAccessModule } from '@case-clinical/api/favorite-provider/data-access'

import { ApiFavoriteProviderFeatureAdminResolver } from './api-favorite-provider-feature-admin.resolver'
import { ApiFavoriteProviderFeaturePublicResolver } from './api-favorite-provider-feature-public.resolver'
import { ApiFavoriteProviderFeatureUserResolver } from './api-favorite-provider-feature-user.resolver'

@Module({
  imports: [ApiFavoriteProviderDataAccessModule],
  providers: [
        ApiFavoriteProviderFeatureAdminResolver,
        ApiFavoriteProviderFeaturePublicResolver,
        ApiFavoriteProviderFeatureUserResolver
    ],
})
export class ApiFavoriteProviderFeatureModule {}
