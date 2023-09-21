
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListGenderInput,
  ApiGenderDataAccessPublicService,
  Gender,
} from '@case-clinical/api/gender/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiGenderFeaturePublicResolver {
  constructor(private readonly service: ApiGenderDataAccessPublicService) {}
           
  @Query(() => [Gender], { nullable: true })
  publicGenders(
    @Args({ name: 'input', type: () => UserListGenderInput, nullable: true }) input?: UserListGenderInput,
  ) {
    return this.service.publicGenders(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountGenders(
    @Args({ name: 'input', type: () => UserListGenderInput, nullable: true }) input?: UserListGenderInput,
  ) {
    return this.service.publicCountGenders(input)
  }

  @Query(() => [Gender], { nullable: true })
  publicSelectGenders(
    @Args({ name: 'input', type: () => UserListGenderInput, nullable: true }) input?: UserListGenderInput,
  ) {
    return this.service.publicSelectGenders(input)
  }

  @Query(() => Gender, { nullable: true })
  publicGender(@Args('genderId') genderId: string) {
    return this.service.publicGender(genderId)
  }
}
