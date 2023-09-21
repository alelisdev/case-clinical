
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListVendorLocationInput,
  ApiVendorLocationDataAccessPublicService,
  VendorLocation,
} from '@case-clinical/api/vendor-location/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiVendorLocationFeaturePublicResolver {
  constructor(private readonly service: ApiVendorLocationDataAccessPublicService) {}
           
  @Query(() => [VendorLocation], { nullable: true })
  publicVendorLocations(
    @Args({ name: 'input', type: () => UserListVendorLocationInput, nullable: true }) input?: UserListVendorLocationInput,
  ) {
    return this.service.publicVendorLocations(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountVendorLocations(
    @Args({ name: 'input', type: () => UserListVendorLocationInput, nullable: true }) input?: UserListVendorLocationInput,
  ) {
    return this.service.publicCountVendorLocations(input)
  }

  @Query(() => [VendorLocation], { nullable: true })
  publicSelectVendorLocations(
    @Args({ name: 'input', type: () => UserListVendorLocationInput, nullable: true }) input?: UserListVendorLocationInput,
  ) {
    return this.service.publicSelectVendorLocations(input)
  }

  @Query(() => VendorLocation, { nullable: true })
  publicVendorLocation(@Args('vendorLocationId') vendorLocationId: string) {
    return this.service.publicVendorLocation(vendorLocationId)
  }
}
