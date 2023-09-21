
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListCaseAccountPaymentInput,
  ApiCaseAccountPaymentDataAccessPublicService,
  CaseAccountPayment,
} from '@case-clinical/api/case-account-payment/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiCaseAccountPaymentFeaturePublicResolver {
  constructor(private readonly service: ApiCaseAccountPaymentDataAccessPublicService) {}
           
  @Query(() => [CaseAccountPayment], { nullable: true })
  publicCaseAccountPayments(
    @Args({ name: 'input', type: () => UserListCaseAccountPaymentInput, nullable: true }) input?: UserListCaseAccountPaymentInput,
  ) {
    return this.service.publicCaseAccountPayments(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountCaseAccountPayments(
    @Args({ name: 'input', type: () => UserListCaseAccountPaymentInput, nullable: true }) input?: UserListCaseAccountPaymentInput,
  ) {
    return this.service.publicCountCaseAccountPayments(input)
  }

  @Query(() => [CaseAccountPayment], { nullable: true })
  publicSelectCaseAccountPayments(
    @Args({ name: 'input', type: () => UserListCaseAccountPaymentInput, nullable: true }) input?: UserListCaseAccountPaymentInput,
  ) {
    return this.service.publicSelectCaseAccountPayments(input)
  }

  @Query(() => CaseAccountPayment, { nullable: true })
  publicCaseAccountPayment(@Args('caseAccountPaymentId') caseAccountPaymentId: string) {
    return this.service.publicCaseAccountPayment(caseAccountPaymentId)
  }
}
