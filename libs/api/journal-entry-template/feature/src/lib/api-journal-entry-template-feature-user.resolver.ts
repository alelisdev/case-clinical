
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateJournalEntryTemplateInput,
  UserListJournalEntryTemplateInput,
  UserUpdateJournalEntryTemplateInput,
  UserUpdateJournalEntryTemplatesInput,
  ApiJournalEntryTemplateDataAccessUserService,
  JournalEntryTemplate,
} from '@case-clinical/api/journal-entry-template/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListCaseAccountInput, CaseAccount } from '@case-clinical/api/case-account/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiJournalEntryTemplateFeatureUserResolver {
  constructor(private readonly service: ApiJournalEntryTemplateDataAccessUserService) {}

  @Query(() => [JournalEntryTemplate], { nullable: true })
  userJournalEntryTemplates(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListJournalEntryTemplateInput, nullable: true }) input?: UserListJournalEntryTemplateInput,
  ) {
    return this.service.userJournalEntryTemplates(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountJournalEntryTemplates(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListJournalEntryTemplateInput, nullable: true }) input?: UserListJournalEntryTemplateInput,
  ) {
    return this.service.userCountJournalEntryTemplates(user.id, input)
  }

  @Query(() => [JournalEntryTemplate], { nullable: true })
  userSelectJournalEntryTemplates(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListJournalEntryTemplateInput, nullable: true }) input?: UserListJournalEntryTemplateInput,
  ) {
    return this.service.userSelectJournalEntryTemplates(user.id, input)
  }







  @Query(() => JournalEntryTemplate, { nullable: true })
  userJournalEntryTemplate(@CtxUser() user: User, @Args('journalEntryTemplateId') journalEntryTemplateId: string) {
    return this.service.userJournalEntryTemplate(user.id, journalEntryTemplateId)
  }

  @Mutation(() => JournalEntryTemplate, { nullable: true })
  userCreateJournalEntryTemplate(@CtxUser() user: User, @Args('input') input: UserCreateJournalEntryTemplateInput,) {
    return this.service.userCreateJournalEntryTemplate(user.id, input)
  }

  @Mutation(() => JournalEntryTemplate, { nullable: true })
  userUpdateJournalEntryTemplate(
    @CtxUser() user: User,
    @Args('journalEntryTemplateId') journalEntryTemplateId: string,
    @Args('input') input: UserUpdateJournalEntryTemplateInput,
  ) {
    return this.service.userUpdateJournalEntryTemplate(user.id, journalEntryTemplateId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateJournalEntryTemplates(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateJournalEntryTemplatesInput,
  ) {
    return this.service.userUpdateJournalEntryTemplates(user.id, input)
  }

  @Mutation(() => JournalEntryTemplate, { nullable: true })
  userDeleteJournalEntryTemplate(@CtxUser() user: User, @Args('journalEntryTemplateId') journalEntryTemplateId: string) {
    return this.service.userDeleteJournalEntryTemplate(user.id, journalEntryTemplateId)
  }
}

