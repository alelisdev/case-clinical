
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateAttorneyStatusInput,
  UserListAttorneyStatusInput,
  UserUpdateAttorneyStatusInput,
  UserUpdateAttorneyStatusesInput,
  ApiAttorneyStatusDataAccessUserService,
  AttorneyStatus,
} from '@case-clinical/api/attorney-status/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiAttorneyStatusFeatureUserResolver {
  constructor(private readonly service: ApiAttorneyStatusDataAccessUserService) {}

  @Query(() => [AttorneyStatus], { nullable: true })
  userAttorneyStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAttorneyStatusInput, nullable: true }) input?: UserListAttorneyStatusInput,
  ) {
    return this.service.userAttorneyStatuses(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountAttorneyStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAttorneyStatusInput, nullable: true }) input?: UserListAttorneyStatusInput,
  ) {
    return this.service.userCountAttorneyStatuses(user.id, input)
  }

  @Query(() => [AttorneyStatus], { nullable: true })
  userSelectAttorneyStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAttorneyStatusInput, nullable: true }) input?: UserListAttorneyStatusInput,
  ) {
    return this.service.userSelectAttorneyStatuses(user.id, input)
  }







  @Query(() => AttorneyStatus, { nullable: true })
  userAttorneyStatus(@CtxUser() user: User, @Args('attorneyStatusId') attorneyStatusId: string) {
    return this.service.userAttorneyStatus(user.id, attorneyStatusId)
  }

  @Mutation(() => AttorneyStatus, { nullable: true })
  userCreateAttorneyStatus(@CtxUser() user: User, @Args('input') input: UserCreateAttorneyStatusInput,) {
    return this.service.userCreateAttorneyStatus(user.id, input)
  }

  @Mutation(() => AttorneyStatus, { nullable: true })
  userUpdateAttorneyStatus(
    @CtxUser() user: User,
    @Args('attorneyStatusId') attorneyStatusId: string,
    @Args('input') input: UserUpdateAttorneyStatusInput,
  ) {
    return this.service.userUpdateAttorneyStatus(user.id, attorneyStatusId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateAttorneyStatuses(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateAttorneyStatusesInput,
  ) {
    return this.service.userUpdateAttorneyStatuses(user.id, input)
  }

  @Mutation(() => AttorneyStatus, { nullable: true })
  userDeleteAttorneyStatus(@CtxUser() user: User, @Args('attorneyStatusId') attorneyStatusId: string) {
    return this.service.userDeleteAttorneyStatus(user.id, attorneyStatusId)
  }
}

