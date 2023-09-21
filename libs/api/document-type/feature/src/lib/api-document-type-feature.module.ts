
import { Module } from '@nestjs/common'
import { ApiDocumentTypeDataAccessModule } from '@case-clinical/api/document-type/data-access'

import { ApiDocumentTypeFeatureAdminResolver } from './api-document-type-feature-admin.resolver'
import { ApiDocumentTypeFeaturePublicResolver } from './api-document-type-feature-public.resolver'
import { ApiDocumentTypeFeatureUserResolver } from './api-document-type-feature-user.resolver'

@Module({
  imports: [ApiDocumentTypeDataAccessModule],
  providers: [
        ApiDocumentTypeFeatureAdminResolver,
        ApiDocumentTypeFeaturePublicResolver,
        ApiDocumentTypeFeatureUserResolver
    ],
})
export class ApiDocumentTypeFeatureModule {}
