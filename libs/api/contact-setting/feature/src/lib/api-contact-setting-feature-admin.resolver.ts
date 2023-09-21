
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateContactSettingInput,
  AdminListContactSettingInput,
  AdminUpdateContactSettingInput,
  ApiContactSettingDataAccessAdminService,
  ContactSetting
} from '@case-clinical/api/contact-setting/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListContactInput, Contact } from '@case-clinical/api/contact/data-access'
import { AdminListIntegrationInput, Integration } from '@case-clinical/api/integration/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiContactSettingFeatureAdminResolver {
  constructor(private readonly service: ApiContactSettingDataAccessAdminService) {}

  @Query(() => [ContactSetting], { nullable: true })
  adminContactSettings(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListContactSettingInput, nullable: true }) input?: AdminListContactSettingInput,
  ) {
    return this.service.adminContactSettings(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountContactSettings(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListContactSettingInput, nullable: true }) input?: AdminListContactSettingInput,
  ) {
    return this.service.adminCountContactSettings(admin.id, input)
  }





  @Query(() => ContactSetting, { nullable: true })
  adminContactSetting(@CtxUser() admin: User, @Args('contactSettingId') contactSettingId: string) {
    return this.service.adminContactSetting(admin.id, contactSettingId)
  }

  @Mutation(() => ContactSetting, { nullable: true })
  adminCreateContactSetting(@CtxUser() admin: User, @Args('input') input: AdminCreateContactSettingInput,) {
    return this.service.adminCreateContactSetting(admin.id, input)
  }

  @Mutation(() => ContactSetting, { nullable: true })
  adminUpdateContactSetting(
    @CtxUser() admin: User,
    @Args('contactSettingId') contactSettingId: string,
    @Args('input') input: AdminUpdateContactSettingInput,
  ) {
    return this.service.adminUpdateContactSetting(admin.id, contactSettingId, input)
  }

  @Mutation(() => ContactSetting, { nullable: true })
  adminDeleteContactSetting(@CtxUser() admin: User, @Args('contactSettingId') contactSettingId: string) {
    return this.service.adminDeleteContactSetting(admin.id, contactSettingId)
  }
}

