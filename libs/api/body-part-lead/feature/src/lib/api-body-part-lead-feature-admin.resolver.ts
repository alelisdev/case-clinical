
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateBodyPartLeadInput,
  AdminListBodyPartLeadInput,
  AdminUpdateBodyPartLeadInput,
  ApiBodyPartLeadDataAccessAdminService,
  BodyPartLead
} from '@case-clinical/api/body-part-lead/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListLeadInput, Lead } from '@case-clinical/api/lead/data-access'
import { AdminListBodyPartInput, BodyPart } from '@case-clinical/api/body-part/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiBodyPartLeadFeatureAdminResolver {
  constructor(private readonly service: ApiBodyPartLeadDataAccessAdminService) {}

  @Query(() => [BodyPartLead], { nullable: true })
  adminBodyPartLeads(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListBodyPartLeadInput, nullable: true }) input?: AdminListBodyPartLeadInput,
  ) {
    return this.service.adminBodyPartLeads(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountBodyPartLeads(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListBodyPartLeadInput, nullable: true }) input?: AdminListBodyPartLeadInput,
  ) {
    return this.service.adminCountBodyPartLeads(admin.id, input)
  }





  @Query(() => BodyPartLead, { nullable: true })
  adminBodyPartLead(@CtxUser() admin: User, @Args('bodyPartLeadId') bodyPartLeadId: string) {
    return this.service.adminBodyPartLead(admin.id, bodyPartLeadId)
  }

  @Mutation(() => BodyPartLead, { nullable: true })
  adminCreateBodyPartLead(@CtxUser() admin: User, @Args('input') input: AdminCreateBodyPartLeadInput,) {
    return this.service.adminCreateBodyPartLead(admin.id, input)
  }

  @Mutation(() => BodyPartLead, { nullable: true })
  adminUpdateBodyPartLead(
    @CtxUser() admin: User,
    @Args('bodyPartLeadId') bodyPartLeadId: string,
    @Args('input') input: AdminUpdateBodyPartLeadInput,
  ) {
    return this.service.adminUpdateBodyPartLead(admin.id, bodyPartLeadId, input)
  }

  @Mutation(() => BodyPartLead, { nullable: true })
  adminDeleteBodyPartLead(@CtxUser() admin: User, @Args('bodyPartLeadId') bodyPartLeadId: string) {
    return this.service.adminDeleteBodyPartLead(admin.id, bodyPartLeadId)
  }
}

