
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiDocumentTypeDataAccessAdminService } from './api-document-type-data-access-admin.service'
import { ApiDocumentTypeDataAccessUserService } from './api-document-type-data-access-user.service'
import { ApiDocumentTypeDataAccessPublicService } from './api-document-type-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiDocumentTypeDataAccessAdminService, ApiDocumentTypeDataAccessUserService, ApiDocumentTypeDataAccessPublicService],
  exports: [ApiDocumentTypeDataAccessAdminService, ApiDocumentTypeDataAccessUserService, ApiDocumentTypeDataAccessPublicService],
})
export class ApiDocumentTypeDataAccessModule {}
