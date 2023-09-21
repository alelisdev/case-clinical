
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePaymentInput,
  AdminListPaymentInput,
  AdminUpdatePaymentInput,
  ApiPaymentDataAccessAdminService,
  Payment
} from '@case-clinical/api/payment/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListBatchControlInput, BatchControl } from '@case-clinical/api/batch-control/data-access'
import { AdminListBankInput, Bank } from '@case-clinical/api/bank/data-access'
import { AdminListPayorTypeInput, PayorType } from '@case-clinical/api/payor-type/data-access'
import { AdminListPaymentTypeInput, PaymentType } from '@case-clinical/api/payment-type/data-access'
import { AdminListPaymentApplicationMethodInput, PaymentApplicationMethod } from '@case-clinical/api/payment-application-method/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiPaymentFeatureAdminResolver {
  constructor(private readonly service: ApiPaymentDataAccessAdminService) {}

  @Query(() => [Payment], { nullable: true })
  adminPayments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPaymentInput, nullable: true }) input?: AdminListPaymentInput,
  ) {
    return this.service.adminPayments(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountPayments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPaymentInput, nullable: true }) input?: AdminListPaymentInput,
  ) {
    return this.service.adminCountPayments(admin.id, input)
  }





  @Query(() => Payment, { nullable: true })
  adminPayment(@CtxUser() admin: User, @Args('paymentId') paymentId: string) {
    return this.service.adminPayment(admin.id, paymentId)
  }

  @Mutation(() => Payment, { nullable: true })
  adminCreatePayment(@CtxUser() admin: User, @Args('input') input: AdminCreatePaymentInput,) {
    return this.service.adminCreatePayment(admin.id, input)
  }

  @Mutation(() => Payment, { nullable: true })
  adminUpdatePayment(
    @CtxUser() admin: User,
    @Args('paymentId') paymentId: string,
    @Args('input') input: AdminUpdatePaymentInput,
  ) {
    return this.service.adminUpdatePayment(admin.id, paymentId, input)
  }

  @Mutation(() => Payment, { nullable: true })
  adminDeletePayment(@CtxUser() admin: User, @Args('paymentId') paymentId: string) {
    return this.service.adminDeletePayment(admin.id, paymentId)
  }
}

