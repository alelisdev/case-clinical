
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateVendorTypeInput,
  AdminListVendorTypeInput,
  AdminUpdateVendorTypeInput,
  ApiVendorTypeDataAccessAdminService,
  VendorType
} from '@case-clinical/api/vendor-type/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiVendorTypeFeatureAdminResolver {
  constructor(private readonly service: ApiVendorTypeDataAccessAdminService) {}

  @Query(() => [VendorType], { nullable: true })
  adminVendorTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListVendorTypeInput, nullable: true }) input?: AdminListVendorTypeInput,
  ) {
    return this.service.adminVendorTypes(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountVendorTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListVendorTypeInput, nullable: true }) input?: AdminListVendorTypeInput,
  ) {
    return this.service.adminCountVendorTypes(admin.id, input)
  }





  @Query(() => VendorType, { nullable: true })
  adminVendorType(@CtxUser() admin: User, @Args('vendorTypeId') vendorTypeId: string) {
    return this.service.adminVendorType(admin.id, vendorTypeId)
  }

  @Mutation(() => VendorType, { nullable: true })
  adminCreateVendorType(@CtxUser() admin: User, @Args('input') input: AdminCreateVendorTypeInput,) {
    return this.service.adminCreateVendorType(admin.id, input)
  }

  @Mutation(() => VendorType, { nullable: true })
  adminUpdateVendorType(
    @CtxUser() admin: User,
    @Args('vendorTypeId') vendorTypeId: string,
    @Args('input') input: AdminUpdateVendorTypeInput,
  ) {
    return this.service.adminUpdateVendorType(admin.id, vendorTypeId, input)
  }

  @Mutation(() => VendorType, { nullable: true })
  adminDeleteVendorType(@CtxUser() admin: User, @Args('vendorTypeId') vendorTypeId: string) {
    return this.service.adminDeleteVendorType(admin.id, vendorTypeId)
  }
}

