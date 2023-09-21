
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreatePermissionInput,
  UserListPermissionInput,
  UserUpdatePermissionInput,
  ApiPermissionDataAccessUserService,
  Permission,
} from '@case-clinical/api/permission/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiPermissionFeatureUserResolver {
  constructor(private readonly service: ApiPermissionDataAccessUserService) {}

  @Query(() => [Permission], { nullable: true })
  userPermissions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPermissionInput, nullable: true }) input?: UserListPermissionInput,
  ) {
    return this.service.userPermissions(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountPermissions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPermissionInput, nullable: true }) input?: UserListPermissionInput,
  ) {
    return this.service.userCountPermissions(user.id, input)
  }

  @Query(() => [Permission], { nullable: true })
  userSelectPermissions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPermissionInput, nullable: true }) input?: UserListPermissionInput,
  ) {
    return this.service.userSelectPermissions(user.id, input)
  }







  @Query(() => Permission, { nullable: true })
  userPermission(@CtxUser() user: User, @Args('permissionId') permissionId: string) {
    return this.service.userPermission(user.id, permissionId)
  }

  @Mutation(() => Permission, { nullable: true })
  userCreatePermission(@CtxUser() user: User, @Args('input') input: UserCreatePermissionInput,) {
    return this.service.userCreatePermission(user.id, input)
  }

  @Mutation(() => Permission, { nullable: true })
  userUpdatePermission(
    @CtxUser() user: User,
    @Args('permissionId') permissionId: string,
    @Args('input') input: UserUpdatePermissionInput,
  ) {
    return this.service.userUpdatePermission(user.id, permissionId, input)
  }

  @Mutation(() => Permission, { nullable: true })
  userDeletePermission(@CtxUser() user: User, @Args('permissionId') permissionId: string) {
    return this.service.userDeletePermission(user.id, permissionId)
  }
}

