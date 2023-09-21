
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateLeadInput,
  AdminListLeadInput,
  AdminUpdateLeadInput,
  ApiLeadDataAccessAdminService,
  Lead
} from '@case-clinical/api/lead/data-access'


import { AdminListAccidentTypeInput, AccidentType } from '@case-clinical/api/accident-type/data-access'
import { AdminListDocumentInput, Document } from '@case-clinical/api/document/data-access'
import { AdminListLeadStatusInput, LeadStatus } from '@case-clinical/api/lead-status/data-access'
import { AdminListLeadSourceInput, LeadSource } from '@case-clinical/api/lead-source/data-access'
import { AdminListUserInput, User } from '@case-clinical/api/user/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiLeadFeatureAdminResolver {
  constructor(private readonly service: ApiLeadDataAccessAdminService) {}

  @Query(() => [Lead], { nullable: true })
  adminLeads(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListLeadInput, nullable: true }) input?: AdminListLeadInput,
  ) {
    return this.service.adminLeads(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountLeads(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListLeadInput, nullable: true }) input?: AdminListLeadInput,
  ) {
    return this.service.adminCountLeads(admin.id, input)
  }





  @Query(() => Lead, { nullable: true })
  adminLead(@CtxUser() admin: User, @Args('leadId') leadId: string) {
    return this.service.adminLead(admin.id, leadId)
  }

  @Mutation(() => Lead, { nullable: true })
  adminCreateLead(@CtxUser() admin: User, @Args('input') input: AdminCreateLeadInput,) {
    return this.service.adminCreateLead(admin.id, input)
  }

  @Mutation(() => Lead, { nullable: true })
  adminUpdateLead(
    @CtxUser() admin: User,
    @Args('leadId') leadId: string,
    @Args('input') input: AdminUpdateLeadInput,
  ) {
    return this.service.adminUpdateLead(admin.id, leadId, input)
  }

  @Mutation(() => Lead, { nullable: true })
  adminDeleteLead(@CtxUser() admin: User, @Args('leadId') leadId: string) {
    return this.service.adminDeleteLead(admin.id, leadId)
  }
}

