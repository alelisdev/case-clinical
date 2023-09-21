import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePlanInput,
  ApiPlanDataAccessAdminService, Plan} from '@case-clinical/api/plan/data-access'
  import { User } from '@case-clinical/api/user/data-access'
import {
  CtxUser,
  GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiPlanFeatureAdminResolver {
  constructor(private readonly service: ApiPlanDataAccessAdminService) {}

  @Mutation(() => Plan, { nullable: true })
  adminCreatePlan(@CtxUser() user: User, @Args('input') input: AdminCreatePlanInput,) {
    return this.service.adminCreatePlan(input)
  }
}

