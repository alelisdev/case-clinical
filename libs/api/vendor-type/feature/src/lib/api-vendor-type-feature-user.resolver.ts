
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateVendorTypeInput,
  UserListVendorTypeInput,
  UserUpdateVendorTypeInput,
  UserUpdateVendorTypesInput,
  ApiVendorTypeDataAccessUserService,
  VendorType,
} from '@case-clinical/api/vendor-type/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiVendorTypeFeatureUserResolver {
  constructor(private readonly service: ApiVendorTypeDataAccessUserService) {}

  @Query(() => [VendorType], { nullable: true })
  userVendorTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListVendorTypeInput, nullable: true }) input?: UserListVendorTypeInput,
  ) {
    return this.service.userVendorTypes(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountVendorTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListVendorTypeInput, nullable: true }) input?: UserListVendorTypeInput,
  ) {
    return this.service.userCountVendorTypes(user.id, input)
  }

  @Query(() => [VendorType], { nullable: true })
  userSelectVendorTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListVendorTypeInput, nullable: true }) input?: UserListVendorTypeInput,
  ) {
    return this.service.userSelectVendorTypes(user.id, input)
  }







  @Query(() => VendorType, { nullable: true })
  userVendorType(@CtxUser() user: User, @Args('vendorTypeId') vendorTypeId: string) {
    return this.service.userVendorType(user.id, vendorTypeId)
  }

  @Mutation(() => VendorType, { nullable: true })
  userCreateVendorType(@CtxUser() user: User, @Args('input') input: UserCreateVendorTypeInput,) {
    return this.service.userCreateVendorType(user.id, input)
  }

  @Mutation(() => VendorType, { nullable: true })
  userUpdateVendorType(
    @CtxUser() user: User,
    @Args('vendorTypeId') vendorTypeId: string,
    @Args('input') input: UserUpdateVendorTypeInput,
  ) {
    return this.service.userUpdateVendorType(user.id, vendorTypeId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateVendorTypes(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateVendorTypesInput,
  ) {
    return this.service.userUpdateVendorTypes(user.id, input)
  }

  @Mutation(() => VendorType, { nullable: true })
  userDeleteVendorType(@CtxUser() user: User, @Args('vendorTypeId') vendorTypeId: string) {
    return this.service.userDeleteVendorType(user.id, vendorTypeId)
  }
}

