
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePaymentApplicationMethodInput,
  AdminListPaymentApplicationMethodInput,
  AdminUpdatePaymentApplicationMethodInput,
  ApiPaymentApplicationMethodDataAccessAdminService,
  PaymentApplicationMethod
} from '@case-clinical/api/payment-application-method/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiPaymentApplicationMethodFeatureAdminResolver {
  constructor(private readonly service: ApiPaymentApplicationMethodDataAccessAdminService) {}

  @Query(() => [PaymentApplicationMethod], { nullable: true })
  adminPaymentApplicationMethods(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPaymentApplicationMethodInput, nullable: true }) input?: AdminListPaymentApplicationMethodInput,
  ) {
    return this.service.adminPaymentApplicationMethods(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountPaymentApplicationMethods(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPaymentApplicationMethodInput, nullable: true }) input?: AdminListPaymentApplicationMethodInput,
  ) {
    return this.service.adminCountPaymentApplicationMethods(admin.id, input)
  }





  @Query(() => PaymentApplicationMethod, { nullable: true })
  adminPaymentApplicationMethod(@CtxUser() admin: User, @Args('paymentApplicationMethodId') paymentApplicationMethodId: string) {
    return this.service.adminPaymentApplicationMethod(admin.id, paymentApplicationMethodId)
  }

  @Mutation(() => PaymentApplicationMethod, { nullable: true })
  adminCreatePaymentApplicationMethod(@CtxUser() admin: User, @Args('input') input: AdminCreatePaymentApplicationMethodInput,) {
    return this.service.adminCreatePaymentApplicationMethod(admin.id, input)
  }

  @Mutation(() => PaymentApplicationMethod, { nullable: true })
  adminUpdatePaymentApplicationMethod(
    @CtxUser() admin: User,
    @Args('paymentApplicationMethodId') paymentApplicationMethodId: string,
    @Args('input') input: AdminUpdatePaymentApplicationMethodInput,
  ) {
    return this.service.adminUpdatePaymentApplicationMethod(admin.id, paymentApplicationMethodId, input)
  }

  @Mutation(() => PaymentApplicationMethod, { nullable: true })
  adminDeletePaymentApplicationMethod(@CtxUser() admin: User, @Args('paymentApplicationMethodId') paymentApplicationMethodId: string) {
    return this.service.adminDeletePaymentApplicationMethod(admin.id, paymentApplicationMethodId)
  }
}

