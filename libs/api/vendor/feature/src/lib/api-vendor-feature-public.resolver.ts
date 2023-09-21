
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListVendorInput,
  ApiVendorDataAccessPublicService,
  Vendor,
} from '@case-clinical/api/vendor/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiVendorFeaturePublicResolver {
  constructor(private readonly service: ApiVendorDataAccessPublicService) {}
           
  @Query(() => [Vendor], { nullable: true })
  publicVendors(
    @Args({ name: 'input', type: () => UserListVendorInput, nullable: true }) input?: UserListVendorInput,
  ) {
    return this.service.publicVendors(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountVendors(
    @Args({ name: 'input', type: () => UserListVendorInput, nullable: true }) input?: UserListVendorInput,
  ) {
    return this.service.publicCountVendors(input)
  }

  @Query(() => [Vendor], { nullable: true })
  publicSelectVendors(
    @Args({ name: 'input', type: () => UserListVendorInput, nullable: true }) input?: UserListVendorInput,
  ) {
    return this.service.publicSelectVendors(input)
  }

  @Query(() => Vendor, { nullable: true })
  publicVendor(@Args('vendorId') vendorId: string) {
    return this.service.publicVendor(vendorId)
  }
}
