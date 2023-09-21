import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateStepInput,
  UserListStepInput,
  UserUpdateStepInput,
  ApiStepDataAccessUserService,
  Step,
} from '@case-clinical/api/academy/step/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import { CtxUser, GqlAuthGuard } from '@case-clinical/api/auth/util'
import { User } from '@case-clinical/api/user/data-access'

@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiStepFeatureUserResolver {
  constructor(private readonly service: ApiStepDataAccessUserService) {}

  @Query(() => [Step], { nullable: true })
  userStepes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListStepInput, nullable: true })
    input?: UserListStepInput,
  ) {
    return this.service.userSteps(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountStepes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListStepInput, nullable: true })
    input?: UserListStepInput,
  ) {
    return this.service.userCountSteps(user.id, input)
  }

  @Query(() => Step, { nullable: true })
  userStep(@CtxUser() user: User, @Args('StepId') StepId: string) {
    return this.service.userStep(user.id, StepId)
  }

  @Mutation(() => Step, { nullable: true })
  userCreateStep(@CtxUser() user: User, @Args('input') input: UserCreateStepInput) {
    return this.service.userCreateStep(user.id, input)
  }

  @Mutation(() => Step, { nullable: true })
  userUpdateStep(
    @CtxUser() user: User,
    @Args('StepId') StepId: string,
    @Args('input') input: UserUpdateStepInput,
  ) {
    return this.service.userUpdateStep(user.id, StepId, input)
  }

  @Mutation(() => Step, { nullable: true })
  userDeleteStep(@CtxUser() user: User, @Args('StepId') StepId: string) {
    return this.service.userDeleteStep(user.id, StepId)
  }

  @Mutation(() => Step, { nullable: true })
  userUpdateStepOrder(
    @CtxUser() user: User,
    @Args('stepId') stepId: string,
    @Args('order') order: number,
  ) {
    return this.service.updateStepOrder(stepId, order)
  }
}
