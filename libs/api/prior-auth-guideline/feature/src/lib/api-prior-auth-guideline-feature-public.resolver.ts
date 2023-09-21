
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListPriorAuthGuidelineInput,
  ApiPriorAuthGuidelineDataAccessPublicService,
  PriorAuthGuideline,
} from '@case-clinical/api/prior-auth-guideline/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiPriorAuthGuidelineFeaturePublicResolver {
  constructor(private readonly service: ApiPriorAuthGuidelineDataAccessPublicService) {}
           
  @Query(() => [PriorAuthGuideline], { nullable: true })
  publicPriorAuthGuidelines(
    @Args({ name: 'input', type: () => UserListPriorAuthGuidelineInput, nullable: true }) input?: UserListPriorAuthGuidelineInput,
  ) {
    return this.service.publicPriorAuthGuidelines(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountPriorAuthGuidelines(
    @Args({ name: 'input', type: () => UserListPriorAuthGuidelineInput, nullable: true }) input?: UserListPriorAuthGuidelineInput,
  ) {
    return this.service.publicCountPriorAuthGuidelines(input)
  }

  @Query(() => [PriorAuthGuideline], { nullable: true })
  publicSelectPriorAuthGuidelines(
    @Args({ name: 'input', type: () => UserListPriorAuthGuidelineInput, nullable: true }) input?: UserListPriorAuthGuidelineInput,
  ) {
    return this.service.publicSelectPriorAuthGuidelines(input)
  }

  @Query(() => PriorAuthGuideline, { nullable: true })
  publicPriorAuthGuideline(@Args('priorAuthGuidelineId') priorAuthGuidelineId: string) {
    return this.service.publicPriorAuthGuideline(priorAuthGuidelineId)
  }
}
