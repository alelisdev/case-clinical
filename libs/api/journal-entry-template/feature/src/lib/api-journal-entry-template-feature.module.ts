
import { Module } from '@nestjs/common'
import { ApiJournalEntryTemplateDataAccessModule } from '@case-clinical/api/journal-entry-template/data-access'

import { ApiJournalEntryTemplateFeatureAdminResolver } from './api-journal-entry-template-feature-admin.resolver'
import { ApiJournalEntryTemplateFeaturePublicResolver } from './api-journal-entry-template-feature-public.resolver'
import { ApiJournalEntryTemplateFeatureUserResolver } from './api-journal-entry-template-feature-user.resolver'

@Module({
  imports: [ApiJournalEntryTemplateDataAccessModule],
  providers: [
        ApiJournalEntryTemplateFeatureAdminResolver,
        ApiJournalEntryTemplateFeaturePublicResolver,
        ApiJournalEntryTemplateFeatureUserResolver
    ],
})
export class ApiJournalEntryTemplateFeatureModule {}
