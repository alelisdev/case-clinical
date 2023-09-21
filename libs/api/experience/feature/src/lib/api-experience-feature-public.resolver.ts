
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListExperienceInput,
  ApiExperienceDataAccessPublicService,
  Experience,
} from '@case-clinical/api/experience/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiExperienceFeaturePublicResolver {
  constructor(private readonly service: ApiExperienceDataAccessPublicService) {}
           
  @Query(() => [Experience], { nullable: true })
  publicExperiences(
    @Args({ name: 'input', type: () => UserListExperienceInput, nullable: true }) input?: UserListExperienceInput,
  ) {
    return this.service.publicExperiences(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountExperiences(
    @Args({ name: 'input', type: () => UserListExperienceInput, nullable: true }) input?: UserListExperienceInput,
  ) {
    return this.service.publicCountExperiences(input)
  }

  @Query(() => [Experience], { nullable: true })
  publicSelectExperiences(
    @Args({ name: 'input', type: () => UserListExperienceInput, nullable: true }) input?: UserListExperienceInput,
  ) {
    return this.service.publicSelectExperiences(input)
  }

  @Query(() => Experience, { nullable: true })
  publicExperience(@Args('experienceId') experienceId: string) {
    return this.service.publicExperience(experienceId)
  }
}
