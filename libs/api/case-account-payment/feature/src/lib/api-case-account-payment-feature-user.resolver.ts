
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateCaseAccountPaymentInput,
  UserListCaseAccountPaymentInput,
  UserUpdateCaseAccountPaymentInput,
  UserUpdateCaseAccountPaymentsInput,
  ApiCaseAccountPaymentDataAccessUserService,
  CaseAccountPayment,
} from '@case-clinical/api/case-account-payment/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListPaymentInput, Payment } from '@case-clinical/api/payment/data-access'
import { UserListCaseAccountInput, CaseAccount } from '@case-clinical/api/case-account/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiCaseAccountPaymentFeatureUserResolver {
  constructor(private readonly service: ApiCaseAccountPaymentDataAccessUserService) {}

  @Query(() => [CaseAccountPayment], { nullable: true })
  userCaseAccountPayments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCaseAccountPaymentInput, nullable: true }) input?: UserListCaseAccountPaymentInput,
  ) {
    return this.service.userCaseAccountPayments(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountCaseAccountPayments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCaseAccountPaymentInput, nullable: true }) input?: UserListCaseAccountPaymentInput,
  ) {
    return this.service.userCountCaseAccountPayments(user.id, input)
  }

  @Query(() => [CaseAccountPayment], { nullable: true })
  userSelectCaseAccountPayments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCaseAccountPaymentInput, nullable: true }) input?: UserListCaseAccountPaymentInput,
  ) {
    return this.service.userSelectCaseAccountPayments(user.id, input)
  }







  @Query(() => CaseAccountPayment, { nullable: true })
  userCaseAccountPayment(@CtxUser() user: User, @Args('caseAccountPaymentId') caseAccountPaymentId: string) {
    return this.service.userCaseAccountPayment(user.id, caseAccountPaymentId)
  }

  @Mutation(() => CaseAccountPayment, { nullable: true })
  userCreateCaseAccountPayment(@CtxUser() user: User, @Args('input') input: UserCreateCaseAccountPaymentInput,) {
    return this.service.userCreateCaseAccountPayment(user.id, input)
  }

  @Mutation(() => CaseAccountPayment, { nullable: true })
  userUpdateCaseAccountPayment(
    @CtxUser() user: User,
    @Args('caseAccountPaymentId') caseAccountPaymentId: string,
    @Args('input') input: UserUpdateCaseAccountPaymentInput,
  ) {
    return this.service.userUpdateCaseAccountPayment(user.id, caseAccountPaymentId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateCaseAccountPayments(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateCaseAccountPaymentsInput,
  ) {
    return this.service.userUpdateCaseAccountPayments(user.id, input)
  }

  @Mutation(() => CaseAccountPayment, { nullable: true })
  userDeleteCaseAccountPayment(@CtxUser() user: User, @Args('caseAccountPaymentId') caseAccountPaymentId: string) {
    return this.service.userDeleteCaseAccountPayment(user.id, caseAccountPaymentId)
  }
}

