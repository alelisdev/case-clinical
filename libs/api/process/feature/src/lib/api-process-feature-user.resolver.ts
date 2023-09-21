
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateProcessInput,
  UserListProcessInput,
  UserUpdateProcessInput,
  UserUpdateProcessesInput,
  ApiProcessDataAccessUserService,
  Process,
} from '@case-clinical/api/process/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiProcessFeatureUserResolver {
  constructor(private readonly service: ApiProcessDataAccessUserService) {}

  @Query(() => [Process], { nullable: true })
  userProcesses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcessInput, nullable: true }) input?: UserListProcessInput,
  ) {
    return this.service.userProcesses(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountProcesses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcessInput, nullable: true }) input?: UserListProcessInput,
  ) {
    return this.service.userCountProcesses(user.id, input)
  }

  @Query(() => [Process], { nullable: true })
  userSelectProcesses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcessInput, nullable: true }) input?: UserListProcessInput,
  ) {
    return this.service.userSelectProcesses(user.id, input)
  }







  @Query(() => Process, { nullable: true })
  userProcess(@CtxUser() user: User, @Args('processId') processId: string) {
    return this.service.userProcess(user.id, processId)
  }

  @Mutation(() => Process, { nullable: true })
  userCreateProcess(@CtxUser() user: User, @Args('input') input: UserCreateProcessInput,) {
    return this.service.userCreateProcess(user.id, input)
  }

  @Mutation(() => Process, { nullable: true })
  userUpdateProcess(
    @CtxUser() user: User,
    @Args('processId') processId: string,
    @Args('input') input: UserUpdateProcessInput,
  ) {
    return this.service.userUpdateProcess(user.id, processId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateProcesses(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateProcessesInput,
  ) {
    return this.service.userUpdateProcesses(user.id, input)
  }

  @Mutation(() => Process, { nullable: true })
  userDeleteProcess(@CtxUser() user: User, @Args('processId') processId: string) {
    return this.service.userDeleteProcess(user.id, processId)
  }
}

