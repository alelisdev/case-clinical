
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListAwardInput,
  ApiAwardDataAccessPublicService,
  Award,
} from '@case-clinical/api/award/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiAwardFeaturePublicResolver {
  constructor(private readonly service: ApiAwardDataAccessPublicService) {}
           
  @Query(() => [Award], { nullable: true })
  publicAwards(
    @Args({ name: 'input', type: () => UserListAwardInput, nullable: true }) input?: UserListAwardInput,
  ) {
    return this.service.publicAwards(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountAwards(
    @Args({ name: 'input', type: () => UserListAwardInput, nullable: true }) input?: UserListAwardInput,
  ) {
    return this.service.publicCountAwards(input)
  }

  @Query(() => [Award], { nullable: true })
  publicSelectAwards(
    @Args({ name: 'input', type: () => UserListAwardInput, nullable: true }) input?: UserListAwardInput,
  ) {
    return this.service.publicSelectAwards(input)
  }

  @Query(() => Award, { nullable: true })
  publicAward(@Args('awardId') awardId: string) {
    return this.service.publicAward(awardId)
  }
}
