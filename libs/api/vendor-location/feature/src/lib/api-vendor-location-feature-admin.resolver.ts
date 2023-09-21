
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateVendorLocationInput,
  AdminListVendorLocationInput,
  AdminUpdateVendorLocationInput,
  ApiVendorLocationDataAccessAdminService,
  VendorLocation
} from '@case-clinical/api/vendor-location/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListLocationInput, Location } from '@case-clinical/api/location/data-access'
import { AdminListVendorInput, Vendor } from '@case-clinical/api/vendor/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiVendorLocationFeatureAdminResolver {
  constructor(private readonly service: ApiVendorLocationDataAccessAdminService) {}

  @Query(() => [VendorLocation], { nullable: true })
  adminVendorLocations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListVendorLocationInput, nullable: true }) input?: AdminListVendorLocationInput,
  ) {
    return this.service.adminVendorLocations(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountVendorLocations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListVendorLocationInput, nullable: true }) input?: AdminListVendorLocationInput,
  ) {
    return this.service.adminCountVendorLocations(admin.id, input)
  }





  @Query(() => VendorLocation, { nullable: true })
  adminVendorLocation(@CtxUser() admin: User, @Args('vendorLocationId') vendorLocationId: string) {
    return this.service.adminVendorLocation(admin.id, vendorLocationId)
  }

  @Mutation(() => VendorLocation, { nullable: true })
  adminCreateVendorLocation(@CtxUser() admin: User, @Args('input') input: AdminCreateVendorLocationInput,) {
    return this.service.adminCreateVendorLocation(admin.id, input)
  }

  @Mutation(() => VendorLocation, { nullable: true })
  adminUpdateVendorLocation(
    @CtxUser() admin: User,
    @Args('vendorLocationId') vendorLocationId: string,
    @Args('input') input: AdminUpdateVendorLocationInput,
  ) {
    return this.service.adminUpdateVendorLocation(admin.id, vendorLocationId, input)
  }

  @Mutation(() => VendorLocation, { nullable: true })
  adminDeleteVendorLocation(@CtxUser() admin: User, @Args('vendorLocationId') vendorLocationId: string) {
    return this.service.adminDeleteVendorLocation(admin.id, vendorLocationId)
  }
}

