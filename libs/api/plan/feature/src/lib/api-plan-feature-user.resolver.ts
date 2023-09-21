
import { Args, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  ApiPlanDataAccessUserService,
  Plan,
  UserListPlanInput,
} from '@case-clinical/api/plan/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiPlanFeatureUserResolver {
  constructor(private readonly service: ApiPlanDataAccessUserService) {}

  @Query(() => [Plan], { nullable: true })
  userPlans(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPlanInput, nullable: true }) input?: UserListPlanInput,
  ) {
    return this.service.userPlans(user.planId, input)
  }
}

