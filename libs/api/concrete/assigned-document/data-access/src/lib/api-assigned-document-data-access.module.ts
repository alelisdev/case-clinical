
import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiAssignedDocumentDataAccessAdminService } from './api-assigned-document-data-access-admin.service'
import { ApiAssignedDocumentDataAccessUserService } from './api-assigned-document-data-access-user.service'
import { ApiAssignedDocumentDataAccessPublicService } from './api-assigned-document-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule, HttpModule],
  providers: [ApiAssignedDocumentDataAccessAdminService, ApiAssignedDocumentDataAccessUserService, ApiAssignedDocumentDataAccessPublicService],
  exports: [ApiAssignedDocumentDataAccessAdminService, ApiAssignedDocumentDataAccessUserService, ApiAssignedDocumentDataAccessPublicService],
})
export class ApiAssignedDocumentDataAccessModule {}
