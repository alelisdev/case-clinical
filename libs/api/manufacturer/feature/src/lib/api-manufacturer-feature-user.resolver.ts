
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateManufacturerInput,
  UserListManufacturerInput,
  UserUpdateManufacturerInput,
  UserUpdateManufacturersInput,
  ApiManufacturerDataAccessUserService,
  Manufacturer,
} from '@case-clinical/api/manufacturer/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiManufacturerFeatureUserResolver {
  constructor(private readonly service: ApiManufacturerDataAccessUserService) {}

  @Query(() => [Manufacturer], { nullable: true })
  userManufacturers(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListManufacturerInput, nullable: true }) input?: UserListManufacturerInput,
  ) {
    return this.service.userManufacturers(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountManufacturers(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListManufacturerInput, nullable: true }) input?: UserListManufacturerInput,
  ) {
    return this.service.userCountManufacturers(user.id, input)
  }

  @Query(() => [Manufacturer], { nullable: true })
  userSelectManufacturers(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListManufacturerInput, nullable: true }) input?: UserListManufacturerInput,
  ) {
    return this.service.userSelectManufacturers(user.id, input)
  }







  @Query(() => Manufacturer, { nullable: true })
  userManufacturer(@CtxUser() user: User, @Args('manufacturerId') manufacturerId: string) {
    return this.service.userManufacturer(user.id, manufacturerId)
  }

  @Mutation(() => Manufacturer, { nullable: true })
  userCreateManufacturer(@CtxUser() user: User, @Args('input') input: UserCreateManufacturerInput,) {
    return this.service.userCreateManufacturer(user.id, input)
  }

  @Mutation(() => Manufacturer, { nullable: true })
  userUpdateManufacturer(
    @CtxUser() user: User,
    @Args('manufacturerId') manufacturerId: string,
    @Args('input') input: UserUpdateManufacturerInput,
  ) {
    return this.service.userUpdateManufacturer(user.id, manufacturerId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateManufacturers(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateManufacturersInput,
  ) {
    return this.service.userUpdateManufacturers(user.id, input)
  }

  @Mutation(() => Manufacturer, { nullable: true })
  userDeleteManufacturer(@CtxUser() user: User, @Args('manufacturerId') manufacturerId: string) {
    return this.service.userDeleteManufacturer(user.id, manufacturerId)
  }
}

