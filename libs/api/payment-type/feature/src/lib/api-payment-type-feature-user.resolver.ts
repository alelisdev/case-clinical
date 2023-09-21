
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreatePaymentTypeInput,
  UserListPaymentTypeInput,
  UserUpdatePaymentTypeInput,
  UserUpdatePaymentTypesInput,
  ApiPaymentTypeDataAccessUserService,
  PaymentType,
} from '@case-clinical/api/payment-type/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiPaymentTypeFeatureUserResolver {
  constructor(private readonly service: ApiPaymentTypeDataAccessUserService) {}

  @Query(() => [PaymentType], { nullable: true })
  userPaymentTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPaymentTypeInput, nullable: true }) input?: UserListPaymentTypeInput,
  ) {
    return this.service.userPaymentTypes(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountPaymentTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPaymentTypeInput, nullable: true }) input?: UserListPaymentTypeInput,
  ) {
    return this.service.userCountPaymentTypes(user.id, input)
  }

  @Query(() => [PaymentType], { nullable: true })
  userSelectPaymentTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPaymentTypeInput, nullable: true }) input?: UserListPaymentTypeInput,
  ) {
    return this.service.userSelectPaymentTypes(user.id, input)
  }







  @Query(() => PaymentType, { nullable: true })
  userPaymentType(@CtxUser() user: User, @Args('paymentTypeId') paymentTypeId: string) {
    return this.service.userPaymentType(user.id, paymentTypeId)
  }

  @Mutation(() => PaymentType, { nullable: true })
  userCreatePaymentType(@CtxUser() user: User, @Args('input') input: UserCreatePaymentTypeInput,) {
    return this.service.userCreatePaymentType(user.id, input)
  }

  @Mutation(() => PaymentType, { nullable: true })
  userUpdatePaymentType(
    @CtxUser() user: User,
    @Args('paymentTypeId') paymentTypeId: string,
    @Args('input') input: UserUpdatePaymentTypeInput,
  ) {
    return this.service.userUpdatePaymentType(user.id, paymentTypeId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdatePaymentTypes(
    @CtxUser() user: User,
    @Args('input') input: UserUpdatePaymentTypesInput,
  ) {
    return this.service.userUpdatePaymentTypes(user.id, input)
  }

  @Mutation(() => PaymentType, { nullable: true })
  userDeletePaymentType(@CtxUser() user: User, @Args('paymentTypeId') paymentTypeId: string) {
    return this.service.userDeletePaymentType(user.id, paymentTypeId)
  }
}

