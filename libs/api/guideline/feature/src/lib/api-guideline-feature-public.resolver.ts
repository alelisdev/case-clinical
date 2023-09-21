
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListGuidelineInput,
  ApiGuidelineDataAccessPublicService,
  Guideline,
} from '@case-clinical/api/guideline/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiGuidelineFeaturePublicResolver {
  constructor(private readonly service: ApiGuidelineDataAccessPublicService) {}
           
  @Query(() => [Guideline], { nullable: true })
  publicGuidelines(
    @Args({ name: 'input', type: () => UserListGuidelineInput, nullable: true }) input?: UserListGuidelineInput,
  ) {
    return this.service.publicGuidelines(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountGuidelines(
    @Args({ name: 'input', type: () => UserListGuidelineInput, nullable: true }) input?: UserListGuidelineInput,
  ) {
    return this.service.publicCountGuidelines(input)
  }

  @Query(() => [Guideline], { nullable: true })
  publicSelectGuidelines(
    @Args({ name: 'input', type: () => UserListGuidelineInput, nullable: true }) input?: UserListGuidelineInput,
  ) {
    return this.service.publicSelectGuidelines(input)
  }

  @Query(() => Guideline, { nullable: true })
  publicGuideline(@Args('guidelineId') guidelineId: string) {
    return this.service.publicGuideline(guidelineId)
  }
}
