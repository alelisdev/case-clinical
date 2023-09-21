
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiJournalEntryDataAccessAdminService } from './api-journal-entry-data-access-admin.service'
import { ApiJournalEntryDataAccessUserService } from './api-journal-entry-data-access-user.service'
import { ApiJournalEntryDataAccessPublicService } from './api-journal-entry-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiJournalEntryDataAccessAdminService, ApiJournalEntryDataAccessUserService, ApiJournalEntryDataAccessPublicService],
  exports: [ApiJournalEntryDataAccessAdminService, ApiJournalEntryDataAccessUserService, ApiJournalEntryDataAccessPublicService],
})
export class ApiJournalEntryDataAccessModule {}
