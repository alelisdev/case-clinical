
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateImplantInput,
  UserListImplantInput,
  UserUpdateImplantInput,
  UserUpdateImplantsInput,
  ApiImplantDataAccessUserService,
  Implant,
} from '@case-clinical/api/implant/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListImplantCategoryInput, ImplantCategory } from '@case-clinical/api/implant-category/data-access'
import { UserListContactInput, Contact } from '@case-clinical/api/contact/data-access'
import { UserListManufacturerInput, Manufacturer } from '@case-clinical/api/manufacturer/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiImplantFeatureUserResolver {
  constructor(private readonly service: ApiImplantDataAccessUserService) {}

  @Query(() => [Implant], { nullable: true })
  userImplants(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListImplantInput, nullable: true }) input?: UserListImplantInput,
  ) {
    return this.service.userImplants(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountImplants(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListImplantInput, nullable: true }) input?: UserListImplantInput,
  ) {
    return this.service.userCountImplants(user.id, input)
  }

  @Query(() => [Implant], { nullable: true })
  userSelectImplants(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListImplantInput, nullable: true }) input?: UserListImplantInput,
  ) {
    return this.service.userSelectImplants(user.id, input)
  }







  @Query(() => Implant, { nullable: true })
  userImplant(@CtxUser() user: User, @Args('implantId') implantId: string) {
    return this.service.userImplant(user.id, implantId)
  }

  @Mutation(() => Implant, { nullable: true })
  userCreateImplant(@CtxUser() user: User, @Args('input') input: UserCreateImplantInput,) {
    return this.service.userCreateImplant(user.id, input)
  }

  @Mutation(() => Implant, { nullable: true })
  userUpdateImplant(
    @CtxUser() user: User,
    @Args('implantId') implantId: string,
    @Args('input') input: UserUpdateImplantInput,
  ) {
    return this.service.userUpdateImplant(user.id, implantId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateImplants(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateImplantsInput,
  ) {
    return this.service.userUpdateImplants(user.id, input)
  }

  @Mutation(() => Implant, { nullable: true })
  userDeleteImplant(@CtxUser() user: User, @Args('implantId') implantId: string) {
    return this.service.userDeleteImplant(user.id, implantId)
  }
}

