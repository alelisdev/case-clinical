
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListPaymentInput,
  ApiPaymentDataAccessPublicService,
  Payment,
} from '@case-clinical/api/payment/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiPaymentFeaturePublicResolver {
  constructor(private readonly service: ApiPaymentDataAccessPublicService) {}
           
  @Query(() => [Payment], { nullable: true })
  publicPayments(
    @Args({ name: 'input', type: () => UserListPaymentInput, nullable: true }) input?: UserListPaymentInput,
  ) {
    return this.service.publicPayments(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountPayments(
    @Args({ name: 'input', type: () => UserListPaymentInput, nullable: true }) input?: UserListPaymentInput,
  ) {
    return this.service.publicCountPayments(input)
  }

  @Query(() => [Payment], { nullable: true })
  publicSelectPayments(
    @Args({ name: 'input', type: () => UserListPaymentInput, nullable: true }) input?: UserListPaymentInput,
  ) {
    return this.service.publicSelectPayments(input)
  }

  @Query(() => Payment, { nullable: true })
  publicPayment(@Args('paymentId') paymentId: string) {
    return this.service.publicPayment(paymentId)
  }
}
