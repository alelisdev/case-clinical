
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateLeadStatusInput,
  AdminListLeadStatusInput,
  AdminUpdateLeadStatusInput,
  ApiLeadStatusDataAccessAdminService,
  LeadStatus
} from '@case-clinical/api/lead-status/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiLeadStatusFeatureAdminResolver {
  constructor(private readonly service: ApiLeadStatusDataAccessAdminService) {}

  @Query(() => [LeadStatus], { nullable: true })
  adminLeadStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListLeadStatusInput, nullable: true }) input?: AdminListLeadStatusInput,
  ) {
    return this.service.adminLeadStatuses(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountLeadStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListLeadStatusInput, nullable: true }) input?: AdminListLeadStatusInput,
  ) {
    return this.service.adminCountLeadStatuses(admin.id, input)
  }





  @Query(() => LeadStatus, { nullable: true })
  adminLeadStatus(@CtxUser() admin: User, @Args('leadStatusId') leadStatusId: string) {
    return this.service.adminLeadStatus(admin.id, leadStatusId)
  }

  @Mutation(() => LeadStatus, { nullable: true })
  adminCreateLeadStatus(@CtxUser() admin: User, @Args('input') input: AdminCreateLeadStatusInput,) {
    return this.service.adminCreateLeadStatus(admin.id, input)
  }

  @Mutation(() => LeadStatus, { nullable: true })
  adminUpdateLeadStatus(
    @CtxUser() admin: User,
    @Args('leadStatusId') leadStatusId: string,
    @Args('input') input: AdminUpdateLeadStatusInput,
  ) {
    return this.service.adminUpdateLeadStatus(admin.id, leadStatusId, input)
  }

  @Mutation(() => LeadStatus, { nullable: true })
  adminDeleteLeadStatus(@CtxUser() admin: User, @Args('leadStatusId') leadStatusId: string) {
    return this.service.adminDeleteLeadStatus(admin.id, leadStatusId)
  }
}

