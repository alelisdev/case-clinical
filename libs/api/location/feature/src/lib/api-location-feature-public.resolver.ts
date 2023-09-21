
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListLocationInput,
  ApiLocationDataAccessPublicService,
  Location,
} from '@case-clinical/api/location/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiLocationFeaturePublicResolver {
  constructor(private readonly service: ApiLocationDataAccessPublicService) {}
           
  @Query(() => [Location], { nullable: true })
  publicLocations(
    @Args({ name: 'input', type: () => UserListLocationInput, nullable: true }) input?: UserListLocationInput,
  ) {
    return this.service.publicLocations(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountLocations(
    @Args({ name: 'input', type: () => UserListLocationInput, nullable: true }) input?: UserListLocationInput,
  ) {
    return this.service.publicCountLocations(input)
  }

  @Query(() => [Location], { nullable: true })
  publicSelectLocations(
    @Args({ name: 'input', type: () => UserListLocationInput, nullable: true }) input?: UserListLocationInput,
  ) {
    return this.service.publicSelectLocations(input)
  }

  @Query(() => Location, { nullable: true })
  publicLocation(@Args('locationId') locationId: string) {
    return this.service.publicLocation(locationId)
  }
}
