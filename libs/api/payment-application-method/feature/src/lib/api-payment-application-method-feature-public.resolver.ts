
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListPaymentApplicationMethodInput,
  ApiPaymentApplicationMethodDataAccessPublicService,
  PaymentApplicationMethod,
} from '@case-clinical/api/payment-application-method/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiPaymentApplicationMethodFeaturePublicResolver {
  constructor(private readonly service: ApiPaymentApplicationMethodDataAccessPublicService) {}
           
  @Query(() => [PaymentApplicationMethod], { nullable: true })
  publicPaymentApplicationMethods(
    @Args({ name: 'input', type: () => UserListPaymentApplicationMethodInput, nullable: true }) input?: UserListPaymentApplicationMethodInput,
  ) {
    return this.service.publicPaymentApplicationMethods(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountPaymentApplicationMethods(
    @Args({ name: 'input', type: () => UserListPaymentApplicationMethodInput, nullable: true }) input?: UserListPaymentApplicationMethodInput,
  ) {
    return this.service.publicCountPaymentApplicationMethods(input)
  }

  @Query(() => [PaymentApplicationMethod], { nullable: true })
  publicSelectPaymentApplicationMethods(
    @Args({ name: 'input', type: () => UserListPaymentApplicationMethodInput, nullable: true }) input?: UserListPaymentApplicationMethodInput,
  ) {
    return this.service.publicSelectPaymentApplicationMethods(input)
  }

  @Query(() => PaymentApplicationMethod, { nullable: true })
  publicPaymentApplicationMethod(@Args('paymentApplicationMethodId') paymentApplicationMethodId: string) {
    return this.service.publicPaymentApplicationMethod(paymentApplicationMethodId)
  }
}
