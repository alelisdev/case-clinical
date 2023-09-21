
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateVendorLocationInput,
  UserListVendorLocationInput,
  UserUpdateVendorLocationInput,
  UserUpdateVendorLocationsInput,
  ApiVendorLocationDataAccessUserService,
  VendorLocation,
} from '@case-clinical/api/vendor-location/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListLocationInput, Location } from '@case-clinical/api/location/data-access'
import { UserListVendorInput, Vendor } from '@case-clinical/api/vendor/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiVendorLocationFeatureUserResolver {
  constructor(private readonly service: ApiVendorLocationDataAccessUserService) {}

  @Query(() => [VendorLocation], { nullable: true })
  userVendorLocations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListVendorLocationInput, nullable: true }) input?: UserListVendorLocationInput,
  ) {
    return this.service.userVendorLocations(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountVendorLocations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListVendorLocationInput, nullable: true }) input?: UserListVendorLocationInput,
  ) {
    return this.service.userCountVendorLocations(user.id, input)
  }

  @Query(() => [VendorLocation], { nullable: true })
  userSelectVendorLocations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListVendorLocationInput, nullable: true }) input?: UserListVendorLocationInput,
  ) {
    return this.service.userSelectVendorLocations(user.id, input)
  }







  @Query(() => VendorLocation, { nullable: true })
  userVendorLocation(@CtxUser() user: User, @Args('vendorLocationId') vendorLocationId: string) {
    return this.service.userVendorLocation(user.id, vendorLocationId)
  }

  @Mutation(() => VendorLocation, { nullable: true })
  userCreateVendorLocation(@CtxUser() user: User, @Args('input') input: UserCreateVendorLocationInput,) {
    return this.service.userCreateVendorLocation(user.id, input)
  }

  @Mutation(() => VendorLocation, { nullable: true })
  userUpdateVendorLocation(
    @CtxUser() user: User,
    @Args('vendorLocationId') vendorLocationId: string,
    @Args('input') input: UserUpdateVendorLocationInput,
  ) {
    return this.service.userUpdateVendorLocation(user.id, vendorLocationId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateVendorLocations(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateVendorLocationsInput,
  ) {
    return this.service.userUpdateVendorLocations(user.id, input)
  }

  @Mutation(() => VendorLocation, { nullable: true })
  userDeleteVendorLocation(@CtxUser() user: User, @Args('vendorLocationId') vendorLocationId: string) {
    return this.service.userDeleteVendorLocation(user.id, vendorLocationId)
  }
}

