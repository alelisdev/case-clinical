import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateStepInput,
  AdminListStepInput,
  AdminUpdateStepInput,
  ApiStepDataAccessAdminService,
  Step
} from '@case-clinical/api/academy/step/data-access'
import { User } from '@case-clinical/api/user/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'

@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiStepFeatureAdminResolver {
  constructor(private readonly service: ApiStepDataAccessAdminService) {}

  @Query(() => [Step], { nullable: true })
  adminStepes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListStepInput, nullable: true }) input?: AdminListStepInput,
  ) {
    return this.service.adminSteps(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountStepes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListStepInput, nullable: true }) input?: AdminListStepInput,
  ) {
    return this.service.adminCountSteps(admin.id, input)
  }

  @Query(() => Step, { nullable: true })
  adminStep(@CtxUser() admin: User, @Args('StepId') StepId: string) {
    return this.service.adminStep(admin.id, StepId)
  }

  @Mutation(() => Step, { nullable: true })
  adminCreateStep(@CtxUser() admin: User, @Args('input') input: AdminCreateStepInput,) {
    return this.service.adminCreateStep(admin.id, input)
  }

  @Mutation(() => Step, { nullable: true })
  adminUpdateStep(
    @CtxUser() admin: User,
    @Args('StepId') StepId: string,
    @Args('input') input: AdminUpdateStepInput,
  ) {
    return this.service.adminUpdateStep(admin.id, StepId, input)
  }

  @Mutation(() => Step, { nullable: true })
  adminDeleteStep(@CtxUser() admin: User, @Args('StepId') StepId: string) {
    return this.service.adminDeleteStep(admin.id, StepId)
  }
}

