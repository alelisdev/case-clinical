
import { Module } from '@nestjs/common'
import { ApiMedicalConditionProviderDataAccessModule } from '@case-clinical/api/medical-condition-provider/data-access'

import { ApiMedicalConditionProviderFeatureAdminResolver } from './api-medical-condition-provider-feature-admin.resolver'
import { ApiMedicalConditionProviderFeaturePublicResolver } from './api-medical-condition-provider-feature-public.resolver'
import { ApiMedicalConditionProviderFeatureUserResolver } from './api-medical-condition-provider-feature-user.resolver'

@Module({
  imports: [ApiMedicalConditionProviderDataAccessModule],
  providers: [
        ApiMedicalConditionProviderFeatureAdminResolver,
        ApiMedicalConditionProviderFeaturePublicResolver,
        ApiMedicalConditionProviderFeatureUserResolver
    ],
})
export class ApiMedicalConditionProviderFeatureModule {}
