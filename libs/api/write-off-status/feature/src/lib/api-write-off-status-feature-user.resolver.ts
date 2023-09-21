
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateWriteOffStatusInput,
  UserListWriteOffStatusInput,
  UserUpdateWriteOffStatusInput,
  UserUpdateWriteOffStatusesInput,
  ApiWriteOffStatusDataAccessUserService,
  WriteOffStatus,
} from '@case-clinical/api/write-off-status/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiWriteOffStatusFeatureUserResolver {
  constructor(private readonly service: ApiWriteOffStatusDataAccessUserService) {}

  @Query(() => [WriteOffStatus], { nullable: true })
  userWriteOffStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListWriteOffStatusInput, nullable: true }) input?: UserListWriteOffStatusInput,
  ) {
    return this.service.userWriteOffStatuses(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountWriteOffStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListWriteOffStatusInput, nullable: true }) input?: UserListWriteOffStatusInput,
  ) {
    return this.service.userCountWriteOffStatuses(user.id, input)
  }

  @Query(() => [WriteOffStatus], { nullable: true })
  userSelectWriteOffStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListWriteOffStatusInput, nullable: true }) input?: UserListWriteOffStatusInput,
  ) {
    return this.service.userSelectWriteOffStatuses(user.id, input)
  }







  @Query(() => WriteOffStatus, { nullable: true })
  userWriteOffStatus(@CtxUser() user: User, @Args('writeOffStatusId') writeOffStatusId: string) {
    return this.service.userWriteOffStatus(user.id, writeOffStatusId)
  }

  @Mutation(() => WriteOffStatus, { nullable: true })
  userCreateWriteOffStatus(@CtxUser() user: User, @Args('input') input: UserCreateWriteOffStatusInput,) {
    return this.service.userCreateWriteOffStatus(user.id, input)
  }

  @Mutation(() => WriteOffStatus, { nullable: true })
  userUpdateWriteOffStatus(
    @CtxUser() user: User,
    @Args('writeOffStatusId') writeOffStatusId: string,
    @Args('input') input: UserUpdateWriteOffStatusInput,
  ) {
    return this.service.userUpdateWriteOffStatus(user.id, writeOffStatusId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateWriteOffStatuses(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateWriteOffStatusesInput,
  ) {
    return this.service.userUpdateWriteOffStatuses(user.id, input)
  }

  @Mutation(() => WriteOffStatus, { nullable: true })
  userDeleteWriteOffStatus(@CtxUser() user: User, @Args('writeOffStatusId') writeOffStatusId: string) {
    return this.service.userDeleteWriteOffStatus(user.id, writeOffStatusId)
  }
}

