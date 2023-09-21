
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateBatchControlInput,
  UserListBatchControlInput,
  UserUpdateBatchControlInput,
  UserUpdateBatchControlsInput,
  ApiBatchControlDataAccessUserService,
  BatchControl,
} from '@case-clinical/api/batch-control/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiBatchControlFeatureUserResolver {
  constructor(private readonly service: ApiBatchControlDataAccessUserService) {}

  @Query(() => [BatchControl], { nullable: true })
  userBatchControls(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBatchControlInput, nullable: true }) input?: UserListBatchControlInput,
  ) {
    return this.service.userBatchControls(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountBatchControls(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBatchControlInput, nullable: true }) input?: UserListBatchControlInput,
  ) {
    return this.service.userCountBatchControls(user.id, input)
  }

  @Query(() => [BatchControl], { nullable: true })
  userSelectBatchControls(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBatchControlInput, nullable: true }) input?: UserListBatchControlInput,
  ) {
    return this.service.userSelectBatchControls(user.id, input)
  }







  @Query(() => BatchControl, { nullable: true })
  userBatchControl(@CtxUser() user: User, @Args('batchControlId') batchControlId: string) {
    return this.service.userBatchControl(user.id, batchControlId)
  }

  @Mutation(() => BatchControl, { nullable: true })
  userCreateBatchControl(@CtxUser() user: User, @Args('input') input: UserCreateBatchControlInput,) {
    return this.service.userCreateBatchControl(user.id, input)
  }

  @Mutation(() => BatchControl, { nullable: true })
  userUpdateBatchControl(
    @CtxUser() user: User,
    @Args('batchControlId') batchControlId: string,
    @Args('input') input: UserUpdateBatchControlInput,
  ) {
    return this.service.userUpdateBatchControl(user.id, batchControlId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateBatchControls(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateBatchControlsInput,
  ) {
    return this.service.userUpdateBatchControls(user.id, input)
  }

  @Mutation(() => BatchControl, { nullable: true })
  userDeleteBatchControl(@CtxUser() user: User, @Args('batchControlId') batchControlId: string) {
    return this.service.userDeleteBatchControl(user.id, batchControlId)
  }
}

