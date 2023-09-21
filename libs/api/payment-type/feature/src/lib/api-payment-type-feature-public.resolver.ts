
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListPaymentTypeInput,
  ApiPaymentTypeDataAccessPublicService,
  PaymentType,
} from '@case-clinical/api/payment-type/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiPaymentTypeFeaturePublicResolver {
  constructor(private readonly service: ApiPaymentTypeDataAccessPublicService) {}
           
  @Query(() => [PaymentType], { nullable: true })
  publicPaymentTypes(
    @Args({ name: 'input', type: () => UserListPaymentTypeInput, nullable: true }) input?: UserListPaymentTypeInput,
  ) {
    return this.service.publicPaymentTypes(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountPaymentTypes(
    @Args({ name: 'input', type: () => UserListPaymentTypeInput, nullable: true }) input?: UserListPaymentTypeInput,
  ) {
    return this.service.publicCountPaymentTypes(input)
  }

  @Query(() => [PaymentType], { nullable: true })
  publicSelectPaymentTypes(
    @Args({ name: 'input', type: () => UserListPaymentTypeInput, nullable: true }) input?: UserListPaymentTypeInput,
  ) {
    return this.service.publicSelectPaymentTypes(input)
  }

  @Query(() => PaymentType, { nullable: true })
  publicPaymentType(@Args('paymentTypeId') paymentTypeId: string) {
    return this.service.publicPaymentType(paymentTypeId)
  }
}
