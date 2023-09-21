
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreatePaymentApplicationMethodInput,
  UserListPaymentApplicationMethodInput,
  UserUpdatePaymentApplicationMethodInput,
  UserUpdatePaymentApplicationMethodsInput,
  ApiPaymentApplicationMethodDataAccessUserService,
  PaymentApplicationMethod,
} from '@case-clinical/api/payment-application-method/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiPaymentApplicationMethodFeatureUserResolver {
  constructor(private readonly service: ApiPaymentApplicationMethodDataAccessUserService) {}

  @Query(() => [PaymentApplicationMethod], { nullable: true })
  userPaymentApplicationMethods(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPaymentApplicationMethodInput, nullable: true }) input?: UserListPaymentApplicationMethodInput,
  ) {
    return this.service.userPaymentApplicationMethods(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountPaymentApplicationMethods(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPaymentApplicationMethodInput, nullable: true }) input?: UserListPaymentApplicationMethodInput,
  ) {
    return this.service.userCountPaymentApplicationMethods(user.id, input)
  }

  @Query(() => [PaymentApplicationMethod], { nullable: true })
  userSelectPaymentApplicationMethods(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPaymentApplicationMethodInput, nullable: true }) input?: UserListPaymentApplicationMethodInput,
  ) {
    return this.service.userSelectPaymentApplicationMethods(user.id, input)
  }







  @Query(() => PaymentApplicationMethod, { nullable: true })
  userPaymentApplicationMethod(@CtxUser() user: User, @Args('paymentApplicationMethodId') paymentApplicationMethodId: string) {
    return this.service.userPaymentApplicationMethod(user.id, paymentApplicationMethodId)
  }

  @Mutation(() => PaymentApplicationMethod, { nullable: true })
  userCreatePaymentApplicationMethod(@CtxUser() user: User, @Args('input') input: UserCreatePaymentApplicationMethodInput,) {
    return this.service.userCreatePaymentApplicationMethod(user.id, input)
  }

  @Mutation(() => PaymentApplicationMethod, { nullable: true })
  userUpdatePaymentApplicationMethod(
    @CtxUser() user: User,
    @Args('paymentApplicationMethodId') paymentApplicationMethodId: string,
    @Args('input') input: UserUpdatePaymentApplicationMethodInput,
  ) {
    return this.service.userUpdatePaymentApplicationMethod(user.id, paymentApplicationMethodId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdatePaymentApplicationMethods(
    @CtxUser() user: User,
    @Args('input') input: UserUpdatePaymentApplicationMethodsInput,
  ) {
    return this.service.userUpdatePaymentApplicationMethods(user.id, input)
  }

  @Mutation(() => PaymentApplicationMethod, { nullable: true })
  userDeletePaymentApplicationMethod(@CtxUser() user: User, @Args('paymentApplicationMethodId') paymentApplicationMethodId: string) {
    return this.service.userDeletePaymentApplicationMethod(user.id, paymentApplicationMethodId)
  }
}

