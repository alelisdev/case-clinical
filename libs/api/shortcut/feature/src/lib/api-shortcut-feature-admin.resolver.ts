
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateShortcutInput,
  AdminListShortcutInput,
  AdminUpdateShortcutInput,
  ApiShortcutDataAccessAdminService,
  Shortcut
} from '@case-clinical/api/shortcut/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiShortcutFeatureAdminResolver {
  constructor(private readonly service: ApiShortcutDataAccessAdminService) {}

  @Query(() => [Shortcut], { nullable: true })
  adminShortcuts(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListShortcutInput, nullable: true }) input?: AdminListShortcutInput,
  ) {
    return this.service.adminShortcuts(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountShortcuts(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListShortcutInput, nullable: true }) input?: AdminListShortcutInput,
  ) {
    return this.service.adminCountShortcuts(admin.id, input)
  }





  @Query(() => Shortcut, { nullable: true })
  adminShortcut(@CtxUser() admin: User, @Args('shortcutId') shortcutId: string) {
    return this.service.adminShortcut(admin.id, shortcutId)
  }

  @Mutation(() => Shortcut, { nullable: true })
  adminCreateShortcut(@CtxUser() admin: User, @Args('input') input: AdminCreateShortcutInput,) {
    return this.service.adminCreateShortcut(admin.id, input)
  }

  @Mutation(() => Shortcut, { nullable: true })
  adminUpdateShortcut(
    @CtxUser() admin: User,
    @Args('shortcutId') shortcutId: string,
    @Args('input') input: AdminUpdateShortcutInput,
  ) {
    return this.service.adminUpdateShortcut(admin.id, shortcutId, input)
  }

  @Mutation(() => Shortcut, { nullable: true })
  adminDeleteShortcut(@CtxUser() admin: User, @Args('shortcutId') shortcutId: string) {
    return this.service.adminDeleteShortcut(admin.id, shortcutId)
  }
}

