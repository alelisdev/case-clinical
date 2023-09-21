
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListAttorneyInput,
  ApiAttorneyDataAccessPublicService,
  Attorney,
} from '@case-clinical/api/attorney/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiAttorneyFeaturePublicResolver {
  constructor(private readonly service: ApiAttorneyDataAccessPublicService) {}
           
  @Query(() => [Attorney], { nullable: true })
  publicAttorneys(
    @Args({ name: 'input', type: () => UserListAttorneyInput, nullable: true }) input?: UserListAttorneyInput,
  ) {
    return this.service.publicAttorneys(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountAttorneys(
    @Args({ name: 'input', type: () => UserListAttorneyInput, nullable: true }) input?: UserListAttorneyInput,
  ) {
    return this.service.publicCountAttorneys(input)
  }

  @Query(() => [Attorney], { nullable: true })
  publicSelectAttorneys(
    @Args({ name: 'input', type: () => UserListAttorneyInput, nullable: true }) input?: UserListAttorneyInput,
  ) {
    return this.service.publicSelectAttorneys(input)
  }

  @Query(() => Attorney, { nullable: true })
  publicAttorney(@Args('attorneyId') attorneyId: string) {
    return this.service.publicAttorney(attorneyId)
  }
}
