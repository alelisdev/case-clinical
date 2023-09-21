
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateJournalEntryInput,
  UserListJournalEntryInput,
  UserUpdateJournalEntryInput,
  UserUpdateJournalEntriesInput,
  ApiJournalEntryDataAccessUserService,
  JournalEntry,
} from '@case-clinical/api/journal-entry/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListCaseAccountInput, CaseAccount } from '@case-clinical/api/case-account/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiJournalEntryFeatureUserResolver {
  constructor(private readonly service: ApiJournalEntryDataAccessUserService) {}

  @Query(() => [JournalEntry], { nullable: true })
  userJournalEntries(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListJournalEntryInput, nullable: true }) input?: UserListJournalEntryInput,
  ) {
    return this.service.userJournalEntries(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountJournalEntries(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListJournalEntryInput, nullable: true }) input?: UserListJournalEntryInput,
  ) {
    return this.service.userCountJournalEntries(user.id, input)
  }

  @Query(() => [JournalEntry], { nullable: true })
  userSelectJournalEntries(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListJournalEntryInput, nullable: true }) input?: UserListJournalEntryInput,
  ) {
    return this.service.userSelectJournalEntries(user.id, input)
  }







  @Query(() => JournalEntry, { nullable: true })
  userJournalEntry(@CtxUser() user: User, @Args('journalEntryId') journalEntryId: string) {
    return this.service.userJournalEntry(user.id, journalEntryId)
  }

  @Mutation(() => JournalEntry, { nullable: true })
  userCreateJournalEntry(@CtxUser() user: User, @Args('input') input: UserCreateJournalEntryInput,) {
    return this.service.userCreateJournalEntry(user.id, input)
  }

  @Mutation(() => JournalEntry, { nullable: true })
  userUpdateJournalEntry(
    @CtxUser() user: User,
    @Args('journalEntryId') journalEntryId: string,
    @Args('input') input: UserUpdateJournalEntryInput,
  ) {
    return this.service.userUpdateJournalEntry(user.id, journalEntryId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateJournalEntries(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateJournalEntriesInput,
  ) {
    return this.service.userUpdateJournalEntries(user.id, input)
  }

  @Mutation(() => JournalEntry, { nullable: true })
  userDeleteJournalEntry(@CtxUser() user: User, @Args('journalEntryId') journalEntryId: string) {
    return this.service.userDeleteJournalEntry(user.id, journalEntryId)
  }
}

