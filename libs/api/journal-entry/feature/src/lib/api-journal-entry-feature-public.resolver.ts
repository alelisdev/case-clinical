
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListJournalEntryInput,
  ApiJournalEntryDataAccessPublicService,
  JournalEntry,
} from '@case-clinical/api/journal-entry/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiJournalEntryFeaturePublicResolver {
  constructor(private readonly service: ApiJournalEntryDataAccessPublicService) {}
           
  @Query(() => [JournalEntry], { nullable: true })
  publicJournalEntries(
    @Args({ name: 'input', type: () => UserListJournalEntryInput, nullable: true }) input?: UserListJournalEntryInput,
  ) {
    return this.service.publicJournalEntries(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountJournalEntries(
    @Args({ name: 'input', type: () => UserListJournalEntryInput, nullable: true }) input?: UserListJournalEntryInput,
  ) {
    return this.service.publicCountJournalEntries(input)
  }

  @Query(() => [JournalEntry], { nullable: true })
  publicSelectJournalEntries(
    @Args({ name: 'input', type: () => UserListJournalEntryInput, nullable: true }) input?: UserListJournalEntryInput,
  ) {
    return this.service.publicSelectJournalEntries(input)
  }

  @Query(() => JournalEntry, { nullable: true })
  publicJournalEntry(@Args('journalEntryId') journalEntryId: string) {
    return this.service.publicJournalEntry(journalEntryId)
  }
}
