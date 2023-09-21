
import { Module } from '@nestjs/common'
import { ApiDocumentDataAccessModule } from '@case-clinical/api/document/data-access'

import { ApiDocumentFeatureAdminResolver } from './api-document-feature-admin.resolver'
import { ApiDocumentFeaturePublicResolver } from './api-document-feature-public.resolver'
import { ApiDocumentFeatureUserResolver } from './api-document-feature-user.resolver'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

@Module({
  imports: [ApiDocumentDataAccessModule, ApiCoreDataAccessModule],
  providers: [
        ApiDocumentFeatureAdminResolver,
        ApiDocumentFeaturePublicResolver,
        ApiDocumentFeatureUserResolver
    ],
})
export class ApiDocumentFeatureModule {}
