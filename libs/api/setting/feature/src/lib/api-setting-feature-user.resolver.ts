
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateSettingInput,
  UserListSettingInput,
  UserUpdateSettingInput,
  UserUpdateSettingsInput,
  ApiSettingDataAccessUserService,
  Setting,
} from '@case-clinical/api/setting/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'



import { UserListUserInput, User } from '@case-clinical/api/user/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiSettingFeatureUserResolver {
  constructor(private readonly service: ApiSettingDataAccessUserService) {}

  @Query(() => [Setting], { nullable: true })
  userSettings(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListSettingInput, nullable: true }) input?: UserListSettingInput,
  ) {
    return this.service.userSettings(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountSettings(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListSettingInput, nullable: true }) input?: UserListSettingInput,
  ) {
    return this.service.userCountSettings(user.id, input)
  }

  @Query(() => [Setting], { nullable: true })
  userSelectSettings(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListSettingInput, nullable: true }) input?: UserListSettingInput,
  ) {
    return this.service.userSelectSettings(user.id, input)
  }







  @Query(() => Setting, { nullable: true })
  userSetting(@CtxUser() user: User, @Args('settingId') settingId: string) {
    return this.service.userSetting(user.id, settingId)
  }

  @Mutation(() => Setting, { nullable: true })
  userCreateSetting(@CtxUser() user: User, @Args('input') input: UserCreateSettingInput,) {
    return this.service.userCreateSetting(user.id, input)
  }

  @Mutation(() => Setting, { nullable: true })
  userUpdateSetting(
    @CtxUser() user: User,
    @Args('settingId') settingId: string,
    @Args('input') input: UserUpdateSettingInput,
  ) {
    return this.service.userUpdateSetting(user.id, settingId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateSettings(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateSettingsInput,
  ) {
    return this.service.userUpdateSettings(user.id, input)
  }

  @Mutation(() => Setting, { nullable: true })
  userDeleteSetting(@CtxUser() user: User, @Args('settingId') settingId: string) {
    return this.service.userDeleteSetting(user.id, settingId)
  }
}

