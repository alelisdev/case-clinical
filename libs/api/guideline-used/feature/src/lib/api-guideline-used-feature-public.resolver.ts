
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListGuidelineUsedInput,
  ApiGuidelineUsedDataAccessPublicService,
  GuidelineUsed,
} from '@case-clinical/api/guideline-used/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiGuidelineUsedFeaturePublicResolver {
  constructor(private readonly service: ApiGuidelineUsedDataAccessPublicService) {}
           
  @Query(() => [GuidelineUsed], { nullable: true })
  publicGuidelineUseds(
    @Args({ name: 'input', type: () => UserListGuidelineUsedInput, nullable: true }) input?: UserListGuidelineUsedInput,
  ) {
    return this.service.publicGuidelineUseds(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountGuidelineUseds(
    @Args({ name: 'input', type: () => UserListGuidelineUsedInput, nullable: true }) input?: UserListGuidelineUsedInput,
  ) {
    return this.service.publicCountGuidelineUseds(input)
  }

  @Query(() => [GuidelineUsed], { nullable: true })
  publicSelectGuidelineUseds(
    @Args({ name: 'input', type: () => UserListGuidelineUsedInput, nullable: true }) input?: UserListGuidelineUsedInput,
  ) {
    return this.service.publicSelectGuidelineUseds(input)
  }

  @Query(() => GuidelineUsed, { nullable: true })
  publicGuidelineUsed(@Args('guidelineUsedId') guidelineUsedId: string) {
    return this.service.publicGuidelineUsed(guidelineUsedId)
  }
}
