
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateEligibilityStatusInput,
  AdminListEligibilityStatusInput,
  AdminUpdateEligibilityStatusInput,
  ApiEligibilityStatusDataAccessAdminService,
  EligibilityStatus
} from '@case-clinical/api/eligibility-status/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiEligibilityStatusFeatureAdminResolver {
  constructor(private readonly service: ApiEligibilityStatusDataAccessAdminService) {}

  @Query(() => [EligibilityStatus], { nullable: true })
  adminEligibilityStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListEligibilityStatusInput, nullable: true }) input?: AdminListEligibilityStatusInput,
  ) {
    return this.service.adminEligibilityStatuses(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountEligibilityStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListEligibilityStatusInput, nullable: true }) input?: AdminListEligibilityStatusInput,
  ) {
    return this.service.adminCountEligibilityStatuses(admin.id, input)
  }





  @Query(() => EligibilityStatus, { nullable: true })
  adminEligibilityStatus(@CtxUser() admin: User, @Args('eligibilityStatusId') eligibilityStatusId: string) {
    return this.service.adminEligibilityStatus(admin.id, eligibilityStatusId)
  }

  @Mutation(() => EligibilityStatus, { nullable: true })
  adminCreateEligibilityStatus(@CtxUser() admin: User, @Args('input') input: AdminCreateEligibilityStatusInput,) {
    return this.service.adminCreateEligibilityStatus(admin.id, input)
  }

  @Mutation(() => EligibilityStatus, { nullable: true })
  adminUpdateEligibilityStatus(
    @CtxUser() admin: User,
    @Args('eligibilityStatusId') eligibilityStatusId: string,
    @Args('input') input: AdminUpdateEligibilityStatusInput,
  ) {
    return this.service.adminUpdateEligibilityStatus(admin.id, eligibilityStatusId, input)
  }

  @Mutation(() => EligibilityStatus, { nullable: true })
  adminDeleteEligibilityStatus(@CtxUser() admin: User, @Args('eligibilityStatusId') eligibilityStatusId: string) {
    return this.service.adminDeleteEligibilityStatus(admin.id, eligibilityStatusId)
  }
}

