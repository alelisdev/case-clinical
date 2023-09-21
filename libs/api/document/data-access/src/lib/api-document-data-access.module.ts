
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiDocumentDataAccessAdminService } from './api-document-data-access-admin.service'
import { ApiDocumentDataAccessUserService } from './api-document-data-access-user.service'
import { ApiDocumentDataAccessPublicService } from './api-document-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiDocumentDataAccessAdminService, ApiDocumentDataAccessUserService, ApiDocumentDataAccessPublicService],
  exports: [ApiDocumentDataAccessAdminService, ApiDocumentDataAccessUserService, ApiDocumentDataAccessPublicService],
})
export class ApiDocumentDataAccessModule {}
