
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateUserFeaturePermissionInput,
  UserListUserFeaturePermissionInput,
  UserUpdateUserFeaturePermissionInput,
  ApiUserFeaturePermissionDataAccessUserService,
  UserFeaturePermission,
} from '@case-clinical/api/user-feature-permission/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'



import { UserListFeaturePermissionInput, FeaturePermission } from '@case-clinical/api/feature-permission/data-access'
import { UserListUserInput, User } from '@case-clinical/api/user/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiUserFeaturePermissionFeatureUserResolver {
  constructor(private readonly service: ApiUserFeaturePermissionDataAccessUserService) {}

  @Query(() => [UserFeaturePermission], { nullable: true })
  userUserFeaturePermissions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserFeaturePermissionInput, nullable: true }) input?: UserListUserFeaturePermissionInput,
  ) {
    return this.service.userUserFeaturePermissions(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountUserFeaturePermissions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserFeaturePermissionInput, nullable: true }) input?: UserListUserFeaturePermissionInput,
  ) {
    return this.service.userCountUserFeaturePermissions(user.id, input)
  }

  @Query(() => [UserFeaturePermission], { nullable: true })
  userSelectUserFeaturePermissions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserFeaturePermissionInput, nullable: true }) input?: UserListUserFeaturePermissionInput,
  ) {
    return this.service.userSelectUserFeaturePermissions(user.id, input)
  }







  @Query(() => UserFeaturePermission, { nullable: true })
  userUserFeaturePermission(@CtxUser() user: User, @Args('userFeaturePermissionId') userFeaturePermissionId: string) {
    return this.service.userUserFeaturePermission(user.id, userFeaturePermissionId)
  }

  @Mutation(() => UserFeaturePermission, { nullable: true })
  userCreateUserFeaturePermission(@CtxUser() user: User, @Args('input') input: UserCreateUserFeaturePermissionInput,) {
    return this.service.userCreateUserFeaturePermission(user.id, input)
  }

  @Mutation(() => UserFeaturePermission, { nullable: true })
  userUpdateUserFeaturePermission(
    @CtxUser() user: User,
    @Args('userFeaturePermissionId') userFeaturePermissionId: string,
    @Args('input') input: UserUpdateUserFeaturePermissionInput,
  ) {
    return this.service.userUpdateUserFeaturePermission(user.id, userFeaturePermissionId, input)
  }

  @Mutation(() => UserFeaturePermission, { nullable: true })
  userDeleteUserFeaturePermission(@CtxUser() user: User, @Args('userFeaturePermissionId') userFeaturePermissionId: string) {
    return this.service.userDeleteUserFeaturePermission(user.id, userFeaturePermissionId)
  }
}

