
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateJournalEntryTemplateInput,
  AdminListJournalEntryTemplateInput,
  AdminUpdateJournalEntryTemplateInput,
  ApiJournalEntryTemplateDataAccessAdminService,
  JournalEntryTemplate
} from '@case-clinical/api/journal-entry-template/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListCaseAccountInput, CaseAccount } from '@case-clinical/api/case-account/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiJournalEntryTemplateFeatureAdminResolver {
  constructor(private readonly service: ApiJournalEntryTemplateDataAccessAdminService) {}

  @Query(() => [JournalEntryTemplate], { nullable: true })
  adminJournalEntryTemplates(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListJournalEntryTemplateInput, nullable: true }) input?: AdminListJournalEntryTemplateInput,
  ) {
    return this.service.adminJournalEntryTemplates(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountJournalEntryTemplates(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListJournalEntryTemplateInput, nullable: true }) input?: AdminListJournalEntryTemplateInput,
  ) {
    return this.service.adminCountJournalEntryTemplates(admin.id, input)
  }





  @Query(() => JournalEntryTemplate, { nullable: true })
  adminJournalEntryTemplate(@CtxUser() admin: User, @Args('journalEntryTemplateId') journalEntryTemplateId: string) {
    return this.service.adminJournalEntryTemplate(admin.id, journalEntryTemplateId)
  }

  @Mutation(() => JournalEntryTemplate, { nullable: true })
  adminCreateJournalEntryTemplate(@CtxUser() admin: User, @Args('input') input: AdminCreateJournalEntryTemplateInput,) {
    return this.service.adminCreateJournalEntryTemplate(admin.id, input)
  }

  @Mutation(() => JournalEntryTemplate, { nullable: true })
  adminUpdateJournalEntryTemplate(
    @CtxUser() admin: User,
    @Args('journalEntryTemplateId') journalEntryTemplateId: string,
    @Args('input') input: AdminUpdateJournalEntryTemplateInput,
  ) {
    return this.service.adminUpdateJournalEntryTemplate(admin.id, journalEntryTemplateId, input)
  }

  @Mutation(() => JournalEntryTemplate, { nullable: true })
  adminDeleteJournalEntryTemplate(@CtxUser() admin: User, @Args('journalEntryTemplateId') journalEntryTemplateId: string) {
    return this.service.adminDeleteJournalEntryTemplate(admin.id, journalEntryTemplateId)
  }
}

