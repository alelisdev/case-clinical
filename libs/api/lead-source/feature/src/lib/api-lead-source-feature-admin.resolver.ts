
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateLeadSourceInput,
  AdminListLeadSourceInput,
  AdminUpdateLeadSourceInput,
  ApiLeadSourceDataAccessAdminService,
  LeadSource
} from '@case-clinical/api/lead-source/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiLeadSourceFeatureAdminResolver {
  constructor(private readonly service: ApiLeadSourceDataAccessAdminService) {}

  @Query(() => [LeadSource], { nullable: true })
  adminLeadSources(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListLeadSourceInput, nullable: true }) input?: AdminListLeadSourceInput,
  ) {
    return this.service.adminLeadSources(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountLeadSources(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListLeadSourceInput, nullable: true }) input?: AdminListLeadSourceInput,
  ) {
    return this.service.adminCountLeadSources(admin.id, input)
  }





  @Query(() => LeadSource, { nullable: true })
  adminLeadSource(@CtxUser() admin: User, @Args('leadSourceId') leadSourceId: string) {
    return this.service.adminLeadSource(admin.id, leadSourceId)
  }

  @Mutation(() => LeadSource, { nullable: true })
  adminCreateLeadSource(@CtxUser() admin: User, @Args('input') input: AdminCreateLeadSourceInput,) {
    return this.service.adminCreateLeadSource(admin.id, input)
  }

  @Mutation(() => LeadSource, { nullable: true })
  adminUpdateLeadSource(
    @CtxUser() admin: User,
    @Args('leadSourceId') leadSourceId: string,
    @Args('input') input: AdminUpdateLeadSourceInput,
  ) {
    return this.service.adminUpdateLeadSource(admin.id, leadSourceId, input)
  }

  @Mutation(() => LeadSource, { nullable: true })
  adminDeleteLeadSource(@CtxUser() admin: User, @Args('leadSourceId') leadSourceId: string) {
    return this.service.adminDeleteLeadSource(admin.id, leadSourceId)
  }
}

