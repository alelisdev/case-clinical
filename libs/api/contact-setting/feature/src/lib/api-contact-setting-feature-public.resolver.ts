
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListContactSettingInput,
  ApiContactSettingDataAccessPublicService,
  ContactSetting,
} from '@case-clinical/api/contact-setting/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiContactSettingFeaturePublicResolver {
  constructor(private readonly service: ApiContactSettingDataAccessPublicService) {}
           
  @Query(() => [ContactSetting], { nullable: true })
  publicContactSettings(
    @Args({ name: 'input', type: () => UserListContactSettingInput, nullable: true }) input?: UserListContactSettingInput,
  ) {
    return this.service.publicContactSettings(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountContactSettings(
    @Args({ name: 'input', type: () => UserListContactSettingInput, nullable: true }) input?: UserListContactSettingInput,
  ) {
    return this.service.publicCountContactSettings(input)
  }

  @Query(() => [ContactSetting], { nullable: true })
  publicSelectContactSettings(
    @Args({ name: 'input', type: () => UserListContactSettingInput, nullable: true }) input?: UserListContactSettingInput,
  ) {
    return this.service.publicSelectContactSettings(input)
  }

  @Query(() => ContactSetting, { nullable: true })
  publicContactSetting(@Args('contactSettingId') contactSettingId: string) {
    return this.service.publicContactSetting(contactSettingId)
  }
}
