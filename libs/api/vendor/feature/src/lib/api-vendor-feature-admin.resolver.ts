
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateVendorInput,
  AdminListVendorInput,
  AdminUpdateVendorInput,
  ApiVendorDataAccessAdminService,
  Vendor
} from '@case-clinical/api/vendor/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListVendorTypeInput, VendorType } from '@case-clinical/api/vendor-type/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiVendorFeatureAdminResolver {
  constructor(private readonly service: ApiVendorDataAccessAdminService) {}

  @Query(() => [Vendor], { nullable: true })
  adminVendors(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListVendorInput, nullable: true }) input?: AdminListVendorInput,
  ) {
    return this.service.adminVendors(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountVendors(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListVendorInput, nullable: true }) input?: AdminListVendorInput,
  ) {
    return this.service.adminCountVendors(admin.id, input)
  }





  @Query(() => Vendor, { nullable: true })
  adminVendor(@CtxUser() admin: User, @Args('vendorId') vendorId: string) {
    return this.service.adminVendor(admin.id, vendorId)
  }

  @Mutation(() => Vendor, { nullable: true })
  adminCreateVendor(@CtxUser() admin: User, @Args('input') input: AdminCreateVendorInput,) {
    return this.service.adminCreateVendor(admin.id, input)
  }

  @Mutation(() => Vendor, { nullable: true })
  adminUpdateVendor(
    @CtxUser() admin: User,
    @Args('vendorId') vendorId: string,
    @Args('input') input: AdminUpdateVendorInput,
  ) {
    return this.service.adminUpdateVendor(admin.id, vendorId, input)
  }

  @Mutation(() => Vendor, { nullable: true })
  adminDeleteVendor(@CtxUser() admin: User, @Args('vendorId') vendorId: string) {
    return this.service.adminDeleteVendor(admin.id, vendorId)
  }
}

