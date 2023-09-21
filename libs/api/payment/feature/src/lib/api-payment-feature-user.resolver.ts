
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreatePaymentInput,
  UserListPaymentInput,
  UserUpdatePaymentInput,
  UserUpdatePaymentsInput,
  ApiPaymentDataAccessUserService,
  Payment,
} from '@case-clinical/api/payment/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListBatchControlInput, BatchControl } from '@case-clinical/api/batch-control/data-access'
import { UserListBankInput, Bank } from '@case-clinical/api/bank/data-access'
import { UserListPayorTypeInput, PayorType } from '@case-clinical/api/payor-type/data-access'
import { UserListPaymentTypeInput, PaymentType } from '@case-clinical/api/payment-type/data-access'
import { UserListPaymentApplicationMethodInput, PaymentApplicationMethod } from '@case-clinical/api/payment-application-method/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiPaymentFeatureUserResolver {
  constructor(private readonly service: ApiPaymentDataAccessUserService) {}

  @Query(() => [Payment], { nullable: true })
  userPayments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPaymentInput, nullable: true }) input?: UserListPaymentInput,
  ) {
    return this.service.userPayments(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountPayments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPaymentInput, nullable: true }) input?: UserListPaymentInput,
  ) {
    return this.service.userCountPayments(user.id, input)
  }

  @Query(() => [Payment], { nullable: true })
  userSelectPayments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPaymentInput, nullable: true }) input?: UserListPaymentInput,
  ) {
    return this.service.userSelectPayments(user.id, input)
  }







  @Query(() => Payment, { nullable: true })
  userPayment(@CtxUser() user: User, @Args('paymentId') paymentId: string) {
    return this.service.userPayment(user.id, paymentId)
  }

  @Mutation(() => Payment, { nullable: true })
  userCreatePayment(@CtxUser() user: User, @Args('input') input: UserCreatePaymentInput,) {
    return this.service.userCreatePayment(user.id, input)
  }

  @Mutation(() => Payment, { nullable: true })
  userUpdatePayment(
    @CtxUser() user: User,
    @Args('paymentId') paymentId: string,
    @Args('input') input: UserUpdatePaymentInput,
  ) {
    return this.service.userUpdatePayment(user.id, paymentId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdatePayments(
    @CtxUser() user: User,
    @Args('input') input: UserUpdatePaymentsInput,
  ) {
    return this.service.userUpdatePayments(user.id, input)
  }

  @Mutation(() => Payment, { nullable: true })
  userDeletePayment(@CtxUser() user: User, @Args('paymentId') paymentId: string) {
    return this.service.userDeletePayment(user.id, paymentId)
  }
}

