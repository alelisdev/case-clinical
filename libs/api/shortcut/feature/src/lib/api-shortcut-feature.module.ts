
import { Module } from '@nestjs/common'
import { ApiShortcutDataAccessModule } from '@case-clinical/api/shortcut/data-access'

import { ApiShortcutFeatureAdminResolver } from './api-shortcut-feature-admin.resolver'
import { ApiShortcutFeaturePublicResolver } from './api-shortcut-feature-public.resolver'
import { ApiShortcutFeatureUserResolver } from './api-shortcut-feature-user.resolver'

@Module({
  imports: [ApiShortcutDataAccessModule],
  providers: [
        ApiShortcutFeatureAdminResolver,
        ApiShortcutFeaturePublicResolver,
        ApiShortcutFeatureUserResolver
    ],
})
export class ApiShortcutFeatureModule {}
