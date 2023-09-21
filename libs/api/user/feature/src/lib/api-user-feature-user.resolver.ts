
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateUserInput,
  UserListUserInput,
  UserUpdateUserInput,
  UserUpdateUsersInput,
  ApiUserDataAccessUserService,
  User,
} from '@case-clinical/api/user/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'







@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiUserFeatureUserResolver {
  constructor(private readonly service: ApiUserDataAccessUserService) {}

  @Query(() => [User], { nullable: true })
  userUsers(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserInput, nullable: true }) input?: UserListUserInput,
  ) {
    return this.service.userUsers(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountUsers(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserInput, nullable: true }) input?: UserListUserInput,
  ) {
    return this.service.userCountUsers(user.id, input)
  }

  @Query(() => [User], { nullable: true })
  userSelectUsers(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserInput, nullable: true }) input?: UserListUserInput,
  ) {
    return this.service.userSelectUsers(user.id, input)
  }







  @Query(() => User, { nullable: true })
  userUser(@CtxUser() user: User, @Args('userId') userId: string) {
    return this.service.userUser(user.id, userId)
  }

  @Mutation(() => User, { nullable: true })
  userCreateUser(@CtxUser() user: User, @Args('input') input: UserCreateUserInput,) {
    return this.service.userCreateUser(user.id, input)
  }

  @Mutation(() => User, { nullable: true })
  userUpdateUser(
    @CtxUser() user: User,
    @Args('userId') userId: string,
    @Args('input') input: UserUpdateUserInput,
  ) {
    return this.service.userUpdateUser(user.id, userId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateUsers(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateUsersInput,
  ) {
    return this.service.userUpdateUsers(user.id, input)
  }

  @Mutation(() => User, { nullable: true })
  userDeleteUser(@CtxUser() user: User, @Args('userId') userId: string) {
    return this.service.userDeleteUser(user.id, userId)
  }
}

