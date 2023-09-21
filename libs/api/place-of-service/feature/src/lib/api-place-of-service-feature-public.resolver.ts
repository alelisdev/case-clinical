
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListPlaceOfServiceInput,
  ApiPlaceOfServiceDataAccessPublicService,
  PlaceOfService,
} from '@case-clinical/api/place-of-service/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiPlaceOfServiceFeaturePublicResolver {
  constructor(private readonly service: ApiPlaceOfServiceDataAccessPublicService) {}
           
  @Query(() => [PlaceOfService], { nullable: true })
  publicPlaceOfServices(
    @Args({ name: 'input', type: () => UserListPlaceOfServiceInput, nullable: true }) input?: UserListPlaceOfServiceInput,
  ) {
    return this.service.publicPlaceOfServices(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountPlaceOfServices(
    @Args({ name: 'input', type: () => UserListPlaceOfServiceInput, nullable: true }) input?: UserListPlaceOfServiceInput,
  ) {
    return this.service.publicCountPlaceOfServices(input)
  }

  @Query(() => [PlaceOfService], { nullable: true })
  publicSelectPlaceOfServices(
    @Args({ name: 'input', type: () => UserListPlaceOfServiceInput, nullable: true }) input?: UserListPlaceOfServiceInput,
  ) {
    return this.service.publicSelectPlaceOfServices(input)
  }

  @Query(() => PlaceOfService, { nullable: true })
  publicPlaceOfService(@Args('placeOfServiceId') placeOfServiceId: string) {
    return this.service.publicPlaceOfService(placeOfServiceId)
  }
}
