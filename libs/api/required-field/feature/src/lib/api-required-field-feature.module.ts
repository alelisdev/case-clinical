
import { Module } from '@nestjs/common'
import { ApiRequiredFieldDataAccessModule } from '@case-clinical/api/required-field/data-access'

import { ApiRequiredFieldFeatureAdminResolver } from './api-required-field-feature-admin.resolver'
import { ApiRequiredFieldFeaturePublicResolver } from './api-required-field-feature-public.resolver'
import { ApiRequiredFieldFeatureUserResolver } from './api-required-field-feature-user.resolver'

@Module({
  imports: [ApiRequiredFieldDataAccessModule],
  providers: [
        ApiRequiredFieldFeatureAdminResolver,
        ApiRequiredFieldFeaturePublicResolver,
        ApiRequiredFieldFeatureUserResolver
    ],
})
export class ApiRequiredFieldFeatureModule {}
