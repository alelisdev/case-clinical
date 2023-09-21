
import { Module } from '@nestjs/common'
import { ApiMedicalConditionDataAccessModule } from '@case-clinical/api/medical-condition/data-access'

import { ApiMedicalConditionFeatureAdminResolver } from './api-medical-condition-feature-admin.resolver'
import { ApiMedicalConditionFeaturePublicResolver } from './api-medical-condition-feature-public.resolver'
import { ApiMedicalConditionFeatureUserResolver } from './api-medical-condition-feature-user.resolver'

@Module({
  imports: [ApiMedicalConditionDataAccessModule],
  providers: [
        ApiMedicalConditionFeatureAdminResolver,
        ApiMedicalConditionFeaturePublicResolver,
        ApiMedicalConditionFeatureUserResolver
    ],
})
export class ApiMedicalConditionFeatureModule {}
