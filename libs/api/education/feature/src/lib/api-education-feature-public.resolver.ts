
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListEducationInput,
  ApiEducationDataAccessPublicService,
  Education,
} from '@case-clinical/api/education/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiEducationFeaturePublicResolver {
  constructor(private readonly service: ApiEducationDataAccessPublicService) {}
           
  @Query(() => [Education], { nullable: true })
  publicEducations(
    @Args({ name: 'input', type: () => UserListEducationInput, nullable: true }) input?: UserListEducationInput,
  ) {
    return this.service.publicEducations(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountEducations(
    @Args({ name: 'input', type: () => UserListEducationInput, nullable: true }) input?: UserListEducationInput,
  ) {
    return this.service.publicCountEducations(input)
  }

  @Query(() => [Education], { nullable: true })
  publicSelectEducations(
    @Args({ name: 'input', type: () => UserListEducationInput, nullable: true }) input?: UserListEducationInput,
  ) {
    return this.service.publicSelectEducations(input)
  }

  @Query(() => Education, { nullable: true })
  publicEducation(@Args('educationId') educationId: string) {
    return this.service.publicEducation(educationId)
  }
}
