
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateShortcutInput,
  UserListShortcutInput,
  UserUpdateShortcutInput,
  ApiShortcutDataAccessUserService,
  Shortcut,
} from '@case-clinical/api/shortcut/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiShortcutFeatureUserResolver {
  constructor(private readonly service: ApiShortcutDataAccessUserService) {}

  @Query(() => [Shortcut], { nullable: true })
  userShortcuts(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListShortcutInput, nullable: true }) input?: UserListShortcutInput,
  ) {
    return this.service.userShortcuts(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountShortcuts(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListShortcutInput, nullable: true }) input?: UserListShortcutInput,
  ) {
    return this.service.userCountShortcuts(user.id, input)
  }






  @Query(() => Shortcut, { nullable: true })
  userShortcut(@CtxUser() user: User, @Args('shortcutId') shortcutId: string) {
    return this.service.userShortcut(user.id, shortcutId)
  }

  @Mutation(() => Shortcut, { nullable: true })
  userCreateShortcut(@CtxUser() user: User, @Args('input') input: UserCreateShortcutInput,) {
    return this.service.userCreateShortcut(user.id, input)
  }

  @Mutation(() => Shortcut, { nullable: true })
  userUpdateShortcut(
    @CtxUser() user: User,
    @Args('shortcutId') shortcutId: string,
    @Args('input') input: UserUpdateShortcutInput,
  ) {
    return this.service.userUpdateShortcut(user.id, shortcutId, input)
  }

  @Mutation(() => Shortcut, { nullable: true })
  userDeleteShortcut(@CtxUser() user: User, @Args('shortcutId') shortcutId: string) {
    return this.service.userDeleteShortcut(user.id, shortcutId)
  }
}

