
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListInjuryInput,
  ApiInjuryDataAccessPublicService,
  Injury,
} from '@case-clinical/api/injury/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiInjuryFeaturePublicResolver {
  constructor(private readonly service: ApiInjuryDataAccessPublicService) {}
           
  @Query(() => [Injury], { nullable: true })
  publicInjuries(
    @Args({ name: 'input', type: () => UserListInjuryInput, nullable: true }) input?: UserListInjuryInput,
  ) {
    return this.service.publicInjuries(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountInjuries(
    @Args({ name: 'input', type: () => UserListInjuryInput, nullable: true }) input?: UserListInjuryInput,
  ) {
    return this.service.publicCountInjuries(input)
  }

  @Query(() => [Injury], { nullable: true })
  publicSelectInjuries(
    @Args({ name: 'input', type: () => UserListInjuryInput, nullable: true }) input?: UserListInjuryInput,
  ) {
    return this.service.publicSelectInjuries(input)
  }

  @Query(() => Injury, { nullable: true })
  publicInjury(@Args('injuryId') injuryId: string) {
    return this.service.publicInjury(injuryId)
  }
}
