
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateVendorInput,
  UserListVendorInput,
  UserUpdateVendorInput,
  UserUpdateVendorsInput,
  ApiVendorDataAccessUserService,
  Vendor,
  VendorStats,
} from '@case-clinical/api/vendor/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListVendorTypeInput, VendorType } from '@case-clinical/api/vendor-type/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiVendorFeatureUserResolver {
  constructor(private readonly service: ApiVendorDataAccessUserService) {}

  @Query(() => [Vendor], { nullable: true })
  userVendors(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListVendorInput, nullable: true }) input?: UserListVendorInput,
  ) {
    return this.service.userVendors(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountVendors(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListVendorInput, nullable: true }) input?: UserListVendorInput,
  ) {
    return this.service.userCountVendors(user.id, input)
  }

  @Query(() => [Vendor], { nullable: true })
  userSelectVendors(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListVendorInput, nullable: true }) input?: UserListVendorInput,
  ) {
    return this.service.userSelectVendors(user.id, input)
  }





  @Query(() => Vendor, { nullable: true })
  userVendor(@CtxUser() user: User, @Args('vendorId') vendorId: string) {
    return this.service.userVendor(user.id, vendorId)
  }

  @Query(() => VendorStats, { nullable: true })
  userVendorStats(@CtxUser() user: User, @Args('providorId') providorId: string) {
    return this.service.userVendorStats(user.id, providorId)
  }

  @Mutation(() => Vendor, { nullable: true })
  userCreateVendor(@CtxUser() user: User, @Args('input') input: UserCreateVendorInput,) {
    return this.service.userCreateVendor(user.id, input)
  }

  @Mutation(() => Vendor, { nullable: true })
  userUpdateVendor(
    @CtxUser() user: User,
    @Args('vendorId') vendorId: string,
    @Args('input') input: UserUpdateVendorInput,
  ) {
    return this.service.userUpdateVendor(user.id, vendorId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateVendors(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateVendorsInput,
  ) {
    return this.service.userUpdateVendors(user.id, input)
  }

  @Mutation(() => Vendor, { nullable: true })
  userDeleteVendor(@CtxUser() user: User, @Args('vendorId') vendorId: string) {
    return this.service.userDeleteVendor(user.id, vendorId)
  }
}

