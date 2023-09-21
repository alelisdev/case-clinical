
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePaymentTypeInput,
  AdminListPaymentTypeInput,
  AdminUpdatePaymentTypeInput,
  ApiPaymentTypeDataAccessAdminService,
  PaymentType
} from '@case-clinical/api/payment-type/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiPaymentTypeFeatureAdminResolver {
  constructor(private readonly service: ApiPaymentTypeDataAccessAdminService) {}

  @Query(() => [PaymentType], { nullable: true })
  adminPaymentTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPaymentTypeInput, nullable: true }) input?: AdminListPaymentTypeInput,
  ) {
    return this.service.adminPaymentTypes(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountPaymentTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPaymentTypeInput, nullable: true }) input?: AdminListPaymentTypeInput,
  ) {
    return this.service.adminCountPaymentTypes(admin.id, input)
  }





  @Query(() => PaymentType, { nullable: true })
  adminPaymentType(@CtxUser() admin: User, @Args('paymentTypeId') paymentTypeId: string) {
    return this.service.adminPaymentType(admin.id, paymentTypeId)
  }

  @Mutation(() => PaymentType, { nullable: true })
  adminCreatePaymentType(@CtxUser() admin: User, @Args('input') input: AdminCreatePaymentTypeInput,) {
    return this.service.adminCreatePaymentType(admin.id, input)
  }

  @Mutation(() => PaymentType, { nullable: true })
  adminUpdatePaymentType(
    @CtxUser() admin: User,
    @Args('paymentTypeId') paymentTypeId: string,
    @Args('input') input: AdminUpdatePaymentTypeInput,
  ) {
    return this.service.adminUpdatePaymentType(admin.id, paymentTypeId, input)
  }

  @Mutation(() => PaymentType, { nullable: true })
  adminDeletePaymentType(@CtxUser() admin: User, @Args('paymentTypeId') paymentTypeId: string) {
    return this.service.adminDeletePaymentType(admin.id, paymentTypeId)
  }
}

