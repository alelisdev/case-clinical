
import { Module } from '@nestjs/common'
import { ApiJournalEntryDataAccessModule } from '@case-clinical/api/journal-entry/data-access'

import { ApiJournalEntryFeatureAdminResolver } from './api-journal-entry-feature-admin.resolver'
import { ApiJournalEntryFeaturePublicResolver } from './api-journal-entry-feature-public.resolver'
import { ApiJournalEntryFeatureUserResolver } from './api-journal-entry-feature-user.resolver'

@Module({
  imports: [ApiJournalEntryDataAccessModule],
  providers: [
        ApiJournalEntryFeatureAdminResolver,
        ApiJournalEntryFeaturePublicResolver,
        ApiJournalEntryFeatureUserResolver
    ],
})
export class ApiJournalEntryFeatureModule {}
