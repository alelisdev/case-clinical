
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateLeadActionInput,
  AdminListLeadActionInput,
  AdminUpdateLeadActionInput,
  ApiLeadActionDataAccessAdminService,
  LeadAction
} from '@case-clinical/api/lead-action/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListLeadInput, Lead } from '@case-clinical/api/lead/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiLeadActionFeatureAdminResolver {
  constructor(private readonly service: ApiLeadActionDataAccessAdminService) {}

  @Query(() => [LeadAction], { nullable: true })
  adminLeadActions(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListLeadActionInput, nullable: true }) input?: AdminListLeadActionInput,
  ) {
    return this.service.adminLeadActions(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountLeadActions(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListLeadActionInput, nullable: true }) input?: AdminListLeadActionInput,
  ) {
    return this.service.adminCountLeadActions(admin.id, input)
  }





  @Query(() => LeadAction, { nullable: true })
  adminLeadAction(@CtxUser() admin: User, @Args('leadActionId') leadActionId: string) {
    return this.service.adminLeadAction(admin.id, leadActionId)
  }

  @Mutation(() => LeadAction, { nullable: true })
  adminCreateLeadAction(@CtxUser() admin: User, @Args('input') input: AdminCreateLeadActionInput,) {
    return this.service.adminCreateLeadAction(admin.id, input)
  }

  @Mutation(() => LeadAction, { nullable: true })
  adminUpdateLeadAction(
    @CtxUser() admin: User,
    @Args('leadActionId') leadActionId: string,
    @Args('input') input: AdminUpdateLeadActionInput,
  ) {
    return this.service.adminUpdateLeadAction(admin.id, leadActionId, input)
  }

  @Mutation(() => LeadAction, { nullable: true })
  adminDeleteLeadAction(@CtxUser() admin: User, @Args('leadActionId') leadActionId: string) {
    return this.service.adminDeleteLeadAction(admin.id, leadActionId)
  }
}

