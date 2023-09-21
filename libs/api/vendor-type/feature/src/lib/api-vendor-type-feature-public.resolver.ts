
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListVendorTypeInput,
  ApiVendorTypeDataAccessPublicService,
  VendorType,
} from '@case-clinical/api/vendor-type/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiVendorTypeFeaturePublicResolver {
  constructor(private readonly service: ApiVendorTypeDataAccessPublicService) {}
           
  @Query(() => [VendorType], { nullable: true })
  publicVendorTypes(
    @Args({ name: 'input', type: () => UserListVendorTypeInput, nullable: true }) input?: UserListVendorTypeInput,
  ) {
    return this.service.publicVendorTypes(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountVendorTypes(
    @Args({ name: 'input', type: () => UserListVendorTypeInput, nullable: true }) input?: UserListVendorTypeInput,
  ) {
    return this.service.publicCountVendorTypes(input)
  }

  @Query(() => [VendorType], { nullable: true })
  publicSelectVendorTypes(
    @Args({ name: 'input', type: () => UserListVendorTypeInput, nullable: true }) input?: UserListVendorTypeInput,
  ) {
    return this.service.publicSelectVendorTypes(input)
  }

  @Query(() => VendorType, { nullable: true })
  publicVendorType(@Args('vendorTypeId') vendorTypeId: string) {
    return this.service.publicVendorType(vendorTypeId)
  }
}
