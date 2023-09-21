
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateWriteOffInput,
  UserListWriteOffInput,
  UserUpdateWriteOffInput,
  UserUpdateWriteOffsInput,
  ApiWriteOffDataAccessUserService,
  WriteOff,
} from '@case-clinical/api/write-off/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListCaseAccountInput, CaseAccount } from '@case-clinical/api/case-account/data-access'
import { UserListWriteOffStatusInput, WriteOffStatus } from '@case-clinical/api/write-off-status/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiWriteOffFeatureUserResolver {
  constructor(private readonly service: ApiWriteOffDataAccessUserService) {}

  @Query(() => [WriteOff], { nullable: true })
  userWriteOffs(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListWriteOffInput, nullable: true }) input?: UserListWriteOffInput,
  ) {
    return this.service.userWriteOffs(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountWriteOffs(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListWriteOffInput, nullable: true }) input?: UserListWriteOffInput,
  ) {
    return this.service.userCountWriteOffs(user.id, input)
  }

  @Query(() => [WriteOff], { nullable: true })
  userSelectWriteOffs(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListWriteOffInput, nullable: true }) input?: UserListWriteOffInput,
  ) {
    return this.service.userSelectWriteOffs(user.id, input)
  }







  @Query(() => WriteOff, { nullable: true })
  userWriteOff(@CtxUser() user: User, @Args('writeOffId') writeOffId: string) {
    return this.service.userWriteOff(user.id, writeOffId)
  }

  @Mutation(() => WriteOff, { nullable: true })
  userCreateWriteOff(@CtxUser() user: User, @Args('input') input: UserCreateWriteOffInput,) {
    return this.service.userCreateWriteOff(user.id, input)
  }

  @Mutation(() => WriteOff, { nullable: true })
  userUpdateWriteOff(
    @CtxUser() user: User,
    @Args('writeOffId') writeOffId: string,
    @Args('input') input: UserUpdateWriteOffInput,
  ) {
    return this.service.userUpdateWriteOff(user.id, writeOffId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateWriteOffs(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateWriteOffsInput,
  ) {
    return this.service.userUpdateWriteOffs(user.id, input)
  }

  @Mutation(() => WriteOff, { nullable: true })
  userDeleteWriteOff(@CtxUser() user: User, @Args('writeOffId') writeOffId: string) {
    return this.service.userDeleteWriteOff(user.id, writeOffId)
  }
}

