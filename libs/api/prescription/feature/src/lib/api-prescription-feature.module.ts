
import { Module } from '@nestjs/common'
import { ApiPrescriptionDataAccessModule } from '@case-clinical/api/prescription/data-access'

import { ApiPrescriptionFeatureAdminResolver } from './api-prescription-feature-admin.resolver'
import { ApiPrescriptionFeaturePublicResolver } from './api-prescription-feature-public.resolver'
import { ApiPrescriptionFeatureUserResolver } from './api-prescription-feature-user.resolver'

@Module({
  imports: [ApiPrescriptionDataAccessModule],
  providers: [
        ApiPrescriptionFeatureAdminResolver,
        ApiPrescriptionFeaturePublicResolver,
        ApiPrescriptionFeatureUserResolver
    ],
})
export class ApiPrescriptionFeatureModule {}
