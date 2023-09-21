
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateContactSettingInput,
  UserListContactSettingInput,
  UserUpdateContactSettingInput,
  UserUpdateContactSettingsInput,
  ApiContactSettingDataAccessUserService,
  ContactSetting,
} from '@case-clinical/api/contact-setting/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListContactInput, Contact } from '@case-clinical/api/contact/data-access'
import { UserListIntegrationInput, Integration } from '@case-clinical/api/integration/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiContactSettingFeatureUserResolver {
  constructor(private readonly service: ApiContactSettingDataAccessUserService) {}

  @Query(() => [ContactSetting], { nullable: true })
  userContactSettings(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContactSettingInput, nullable: true }) input?: UserListContactSettingInput,
  ) {
    return this.service.userContactSettings(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountContactSettings(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContactSettingInput, nullable: true }) input?: UserListContactSettingInput,
  ) {
    return this.service.userCountContactSettings(user.id, input)
  }

  @Query(() => [ContactSetting], { nullable: true })
  userSelectContactSettings(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContactSettingInput, nullable: true }) input?: UserListContactSettingInput,
  ) {
    return this.service.userSelectContactSettings(user.id, input)
  }







  @Query(() => ContactSetting, { nullable: true })
  userContactSetting(@CtxUser() user: User, @Args('contactSettingId') contactSettingId: string) {
    return this.service.userContactSetting(user.id, contactSettingId)
  }

  @Mutation(() => ContactSetting, { nullable: true })
  userCreateContactSetting(@CtxUser() user: User, @Args('input') input: UserCreateContactSettingInput,) {
    return this.service.userCreateContactSetting(user.id, input)
  }

  @Mutation(() => ContactSetting, { nullable: true })
  userUpdateContactSetting(
    @CtxUser() user: User,
    @Args('contactSettingId') contactSettingId: string,
    @Args('input') input: UserUpdateContactSettingInput,
  ) {
    return this.service.userUpdateContactSetting(user.id, contactSettingId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateContactSettings(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateContactSettingsInput,
  ) {
    return this.service.userUpdateContactSettings(user.id, input)
  }

  @Mutation(() => ContactSetting, { nullable: true })
  userDeleteContactSetting(@CtxUser() user: User, @Args('contactSettingId') contactSettingId: string) {
    return this.service.userDeleteContactSetting(user.id, contactSettingId)
  }
}

