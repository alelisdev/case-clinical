
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateJournalEntryInput,
  AdminListJournalEntryInput,
  AdminUpdateJournalEntryInput,
  ApiJournalEntryDataAccessAdminService,
  JournalEntry
} from '@case-clinical/api/journal-entry/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListCaseAccountInput, CaseAccount } from '@case-clinical/api/case-account/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiJournalEntryFeatureAdminResolver {
  constructor(private readonly service: ApiJournalEntryDataAccessAdminService) {}

  @Query(() => [JournalEntry], { nullable: true })
  adminJournalEntries(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListJournalEntryInput, nullable: true }) input?: AdminListJournalEntryInput,
  ) {
    return this.service.adminJournalEntries(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountJournalEntries(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListJournalEntryInput, nullable: true }) input?: AdminListJournalEntryInput,
  ) {
    return this.service.adminCountJournalEntries(admin.id, input)
  }





  @Query(() => JournalEntry, { nullable: true })
  adminJournalEntry(@CtxUser() admin: User, @Args('journalEntryId') journalEntryId: string) {
    return this.service.adminJournalEntry(admin.id, journalEntryId)
  }

  @Mutation(() => JournalEntry, { nullable: true })
  adminCreateJournalEntry(@CtxUser() admin: User, @Args('input') input: AdminCreateJournalEntryInput,) {
    return this.service.adminCreateJournalEntry(admin.id, input)
  }

  @Mutation(() => JournalEntry, { nullable: true })
  adminUpdateJournalEntry(
    @CtxUser() admin: User,
    @Args('journalEntryId') journalEntryId: string,
    @Args('input') input: AdminUpdateJournalEntryInput,
  ) {
    return this.service.adminUpdateJournalEntry(admin.id, journalEntryId, input)
  }

  @Mutation(() => JournalEntry, { nullable: true })
  adminDeleteJournalEntry(@CtxUser() admin: User, @Args('journalEntryId') journalEntryId: string) {
    return this.service.adminDeleteJournalEntry(admin.id, journalEntryId)
  }
}

