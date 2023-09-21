
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateSurgicalPositionInput,
  UserListSurgicalPositionInput,
  UserUpdateSurgicalPositionInput,
  UserUpdateSurgicalPositionsInput,
  ApiSurgicalPositionDataAccessUserService,
  SurgicalPosition,
} from '@case-clinical/api/surgical-position/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiSurgicalPositionFeatureUserResolver {
  constructor(private readonly service: ApiSurgicalPositionDataAccessUserService) {}

  @Query(() => [SurgicalPosition], { nullable: true })
  userSurgicalPositions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListSurgicalPositionInput, nullable: true }) input?: UserListSurgicalPositionInput,
  ) {
    return this.service.userSurgicalPositions(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountSurgicalPositions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListSurgicalPositionInput, nullable: true }) input?: UserListSurgicalPositionInput,
  ) {
    return this.service.userCountSurgicalPositions(user.id, input)
  }

  @Query(() => [SurgicalPosition], { nullable: true })
  userSelectSurgicalPositions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListSurgicalPositionInput, nullable: true }) input?: UserListSurgicalPositionInput,
  ) {
    return this.service.userSelectSurgicalPositions(user.id, input)
  }







  @Query(() => SurgicalPosition, { nullable: true })
  userSurgicalPosition(@CtxUser() user: User, @Args('surgicalPositionId') surgicalPositionId: string) {
    return this.service.userSurgicalPosition(user.id, surgicalPositionId)
  }

  @Mutation(() => SurgicalPosition, { nullable: true })
  userCreateSurgicalPosition(@CtxUser() user: User, @Args('input') input: UserCreateSurgicalPositionInput,) {
    return this.service.userCreateSurgicalPosition(user.id, input)
  }

  @Mutation(() => SurgicalPosition, { nullable: true })
  userUpdateSurgicalPosition(
    @CtxUser() user: User,
    @Args('surgicalPositionId') surgicalPositionId: string,
    @Args('input') input: UserUpdateSurgicalPositionInput,
  ) {
    return this.service.userUpdateSurgicalPosition(user.id, surgicalPositionId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateSurgicalPositions(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateSurgicalPositionsInput,
  ) {
    return this.service.userUpdateSurgicalPositions(user.id, input)
  }

  @Mutation(() => SurgicalPosition, { nullable: true })
  userDeleteSurgicalPosition(@CtxUser() user: User, @Args('surgicalPositionId') surgicalPositionId: string) {
    return this.service.userDeleteSurgicalPosition(user.id, surgicalPositionId)
  }
}

