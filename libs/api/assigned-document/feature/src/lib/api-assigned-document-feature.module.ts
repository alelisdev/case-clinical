
import { Module } from '@nestjs/common'
import { ApiAssignedDocumentDataAccessModule } from '@case-clinical/api/assigned-document/data-access'

import { ApiAssignedDocumentFeatureAdminResolver } from './api-assigned-document-feature-admin.resolver'
import { ApiAssignedDocumentFeaturePublicResolver } from './api-assigned-document-feature-public.resolver'
import { ApiAssignedDocumentFeatureUserResolver } from './api-assigned-document-feature-user.resolver'

@Module({
  imports: [ApiAssignedDocumentDataAccessModule],
  providers: [
        ApiAssignedDocumentFeatureAdminResolver,
        ApiAssignedDocumentFeaturePublicResolver,
        ApiAssignedDocumentFeatureUserResolver
    ],
})
export class ApiAssignedDocumentFeatureModule {}
