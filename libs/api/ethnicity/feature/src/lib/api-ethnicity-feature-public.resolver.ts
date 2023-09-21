
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListEthnicityInput,
  ApiEthnicityDataAccessPublicService,
  Ethnicity,
} from '@case-clinical/api/ethnicity/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiEthnicityFeaturePublicResolver {
  constructor(private readonly service: ApiEthnicityDataAccessPublicService) {}
           
  @Query(() => [Ethnicity], { nullable: true })
  publicEthnicities(
    @Args({ name: 'input', type: () => UserListEthnicityInput, nullable: true }) input?: UserListEthnicityInput,
  ) {
    return this.service.publicEthnicities(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountEthnicities(
    @Args({ name: 'input', type: () => UserListEthnicityInput, nullable: true }) input?: UserListEthnicityInput,
  ) {
    return this.service.publicCountEthnicities(input)
  }

  @Query(() => [Ethnicity], { nullable: true })
  publicSelectEthnicities(
    @Args({ name: 'input', type: () => UserListEthnicityInput, nullable: true }) input?: UserListEthnicityInput,
  ) {
    return this.service.publicSelectEthnicities(input)
  }

  @Query(() => Ethnicity, { nullable: true })
  publicEthnicity(@Args('ethnicityId') ethnicityId: string) {
    return this.service.publicEthnicity(ethnicityId)
  }
}
