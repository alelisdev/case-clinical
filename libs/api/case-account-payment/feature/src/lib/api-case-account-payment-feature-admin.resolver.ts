
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateCaseAccountPaymentInput,
  AdminListCaseAccountPaymentInput,
  AdminUpdateCaseAccountPaymentInput,
  ApiCaseAccountPaymentDataAccessAdminService,
  CaseAccountPayment
} from '@case-clinical/api/case-account-payment/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListPaymentInput, Payment } from '@case-clinical/api/payment/data-access'
import { AdminListCaseAccountInput, CaseAccount } from '@case-clinical/api/case-account/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiCaseAccountPaymentFeatureAdminResolver {
  constructor(private readonly service: ApiCaseAccountPaymentDataAccessAdminService) {}

  @Query(() => [CaseAccountPayment], { nullable: true })
  adminCaseAccountPayments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCaseAccountPaymentInput, nullable: true }) input?: AdminListCaseAccountPaymentInput,
  ) {
    return this.service.adminCaseAccountPayments(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountCaseAccountPayments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCaseAccountPaymentInput, nullable: true }) input?: AdminListCaseAccountPaymentInput,
  ) {
    return this.service.adminCountCaseAccountPayments(admin.id, input)
  }





  @Query(() => CaseAccountPayment, { nullable: true })
  adminCaseAccountPayment(@CtxUser() admin: User, @Args('caseAccountPaymentId') caseAccountPaymentId: string) {
    return this.service.adminCaseAccountPayment(admin.id, caseAccountPaymentId)
  }

  @Mutation(() => CaseAccountPayment, { nullable: true })
  adminCreateCaseAccountPayment(@CtxUser() admin: User, @Args('input') input: AdminCreateCaseAccountPaymentInput,) {
    return this.service.adminCreateCaseAccountPayment(admin.id, input)
  }

  @Mutation(() => CaseAccountPayment, { nullable: true })
  adminUpdateCaseAccountPayment(
    @CtxUser() admin: User,
    @Args('caseAccountPaymentId') caseAccountPaymentId: string,
    @Args('input') input: AdminUpdateCaseAccountPaymentInput,
  ) {
    return this.service.adminUpdateCaseAccountPayment(admin.id, caseAccountPaymentId, input)
  }

  @Mutation(() => CaseAccountPayment, { nullable: true })
  adminDeleteCaseAccountPayment(@CtxUser() admin: User, @Args('caseAccountPaymentId') caseAccountPaymentId: string) {
    return this.service.adminDeleteCaseAccountPayment(admin.id, caseAccountPaymentId)
  }
}

