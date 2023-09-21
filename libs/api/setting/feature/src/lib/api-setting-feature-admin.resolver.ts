
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateSettingInput,
  AdminListSettingInput,
  AdminUpdateSettingInput,
  ApiSettingDataAccessAdminService,
  Setting
} from '@case-clinical/api/setting/data-access'


import { AdminListUserInput, User } from '@case-clinical/api/user/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiSettingFeatureAdminResolver {
  constructor(private readonly service: ApiSettingDataAccessAdminService) {}

  @Query(() => [Setting], { nullable: true })
  adminSettings(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListSettingInput, nullable: true }) input?: AdminListSettingInput,
  ) {
    return this.service.adminSettings(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountSettings(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListSettingInput, nullable: true }) input?: AdminListSettingInput,
  ) {
    return this.service.adminCountSettings(admin.id, input)
  }





  @Query(() => Setting, { nullable: true })
  adminSetting(@CtxUser() admin: User, @Args('settingId') settingId: string) {
    return this.service.adminSetting(admin.id, settingId)
  }

  @Mutation(() => Setting, { nullable: true })
  adminCreateSetting(@CtxUser() admin: User, @Args('input') input: AdminCreateSettingInput,) {
    return this.service.adminCreateSetting(admin.id, input)
  }

  @Mutation(() => Setting, { nullable: true })
  adminUpdateSetting(
    @CtxUser() admin: User,
    @Args('settingId') settingId: string,
    @Args('input') input: AdminUpdateSettingInput,
  ) {
    return this.service.adminUpdateSetting(admin.id, settingId, input)
  }

  @Mutation(() => Setting, { nullable: true })
  adminDeleteSetting(@CtxUser() admin: User, @Args('settingId') settingId: string) {
    return this.service.adminDeleteSetting(admin.id, settingId)
  }
}

