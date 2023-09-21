
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiJournalEntryTemplateDataAccessAdminService } from './api-journal-entry-template-data-access-admin.service'
import { ApiJournalEntryTemplateDataAccessUserService } from './api-journal-entry-template-data-access-user.service'
import { ApiJournalEntryTemplateDataAccessPublicService } from './api-journal-entry-template-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiJournalEntryTemplateDataAccessAdminService, ApiJournalEntryTemplateDataAccessUserService, ApiJournalEntryTemplateDataAccessPublicService],
  exports: [ApiJournalEntryTemplateDataAccessAdminService, ApiJournalEntryTemplateDataAccessUserService, ApiJournalEntryTemplateDataAccessPublicService],
})
export class ApiJournalEntryTemplateDataAccessModule {}
