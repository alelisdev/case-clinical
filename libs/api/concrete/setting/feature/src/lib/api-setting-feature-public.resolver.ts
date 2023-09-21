
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListSettingInput,
  ApiSettingDataAccessPublicService,
  Setting,
} from '@case-clinical/api/setting/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiSettingFeaturePublicResolver {
  constructor(private readonly service: ApiSettingDataAccessPublicService) {}
           
  @Query(() => [Setting], { nullable: true })
  publicSettings(
    @Args({ name: 'input', type: () => UserListSettingInput, nullable: true }) input?: UserListSettingInput,
  ) {
    return this.service.publicSettings(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountSettings(
    @Args({ name: 'input', type: () => UserListSettingInput, nullable: true }) input?: UserListSettingInput,
  ) {
    return this.service.publicCountSettings(input)
  }

  @Query(() => [Setting], { nullable: true })
  publicSelectSettings(
    @Args({ name: 'input', type: () => UserListSettingInput, nullable: true }) input?: UserListSettingInput,
  ) {
    return this.service.publicSelectSettings(input)
  }

  @Query(() => Setting, { nullable: true })
  publicSetting(@Args('settingId') settingId: string) {
    return this.service.publicSetting(settingId)
  }
}
