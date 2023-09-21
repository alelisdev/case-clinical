
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreatePayorTypeInput,
  UserListPayorTypeInput,
  UserUpdatePayorTypeInput,
  UserUpdatePayorTypesInput,
  ApiPayorTypeDataAccessUserService,
  PayorType,
} from '@case-clinical/api/payor-type/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiPayorTypeFeatureUserResolver {
  constructor(private readonly service: ApiPayorTypeDataAccessUserService) {}

  @Query(() => [PayorType], { nullable: true })
  userPayorTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPayorTypeInput, nullable: true }) input?: UserListPayorTypeInput,
  ) {
    return this.service.userPayorTypes(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountPayorTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPayorTypeInput, nullable: true }) input?: UserListPayorTypeInput,
  ) {
    return this.service.userCountPayorTypes(user.id, input)
  }

  @Query(() => [PayorType], { nullable: true })
  userSelectPayorTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPayorTypeInput, nullable: true }) input?: UserListPayorTypeInput,
  ) {
    return this.service.userSelectPayorTypes(user.id, input)
  }







  @Query(() => PayorType, { nullable: true })
  userPayorType(@CtxUser() user: User, @Args('payorTypeId') payorTypeId: string) {
    return this.service.userPayorType(user.id, payorTypeId)
  }

  @Mutation(() => PayorType, { nullable: true })
  userCreatePayorType(@CtxUser() user: User, @Args('input') input: UserCreatePayorTypeInput,) {
    return this.service.userCreatePayorType(user.id, input)
  }

  @Mutation(() => PayorType, { nullable: true })
  userUpdatePayorType(
    @CtxUser() user: User,
    @Args('payorTypeId') payorTypeId: string,
    @Args('input') input: UserUpdatePayorTypeInput,
  ) {
    return this.service.userUpdatePayorType(user.id, payorTypeId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdatePayorTypes(
    @CtxUser() user: User,
    @Args('input') input: UserUpdatePayorTypesInput,
  ) {
    return this.service.userUpdatePayorTypes(user.id, input)
  }

  @Mutation(() => PayorType, { nullable: true })
  userDeletePayorType(@CtxUser() user: User, @Args('payorTypeId') payorTypeId: string) {
    return this.service.userDeletePayorType(user.id, payorTypeId)
  }
}

