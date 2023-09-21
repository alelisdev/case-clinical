
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListJournalEntryTemplateInput,
  ApiJournalEntryTemplateDataAccessPublicService,
  JournalEntryTemplate,
} from '@case-clinical/api/journal-entry-template/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiJournalEntryTemplateFeaturePublicResolver {
  constructor(private readonly service: ApiJournalEntryTemplateDataAccessPublicService) {}
           
  @Query(() => [JournalEntryTemplate], { nullable: true })
  publicJournalEntryTemplates(
    @Args({ name: 'input', type: () => UserListJournalEntryTemplateInput, nullable: true }) input?: UserListJournalEntryTemplateInput,
  ) {
    return this.service.publicJournalEntryTemplates(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountJournalEntryTemplates(
    @Args({ name: 'input', type: () => UserListJournalEntryTemplateInput, nullable: true }) input?: UserListJournalEntryTemplateInput,
  ) {
    return this.service.publicCountJournalEntryTemplates(input)
  }

  @Query(() => [JournalEntryTemplate], { nullable: true })
  publicSelectJournalEntryTemplates(
    @Args({ name: 'input', type: () => UserListJournalEntryTemplateInput, nullable: true }) input?: UserListJournalEntryTemplateInput,
  ) {
    return this.service.publicSelectJournalEntryTemplates(input)
  }

  @Query(() => JournalEntryTemplate, { nullable: true })
  publicJournalEntryTemplate(@Args('journalEntryTemplateId') journalEntryTemplateId: string) {
    return this.service.publicJournalEntryTemplate(journalEntryTemplateId)
  }
}
