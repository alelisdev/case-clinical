
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateInvoiceDetailInput,
  UserListInvoiceDetailInput,
  UserUpdateInvoiceDetailInput,
  UserUpdateInvoiceDetailsInput,
  ApiInvoiceDetailDataAccessUserService,
  InvoiceDetail,
} from '@case-clinical/api/invoice-detail/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListInvoiceInput, Invoice } from '@case-clinical/api/invoice/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiInvoiceDetailFeatureUserResolver {
  constructor(private readonly service: ApiInvoiceDetailDataAccessUserService) {}

  @Query(() => [InvoiceDetail], { nullable: true })
  userInvoiceDetails(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListInvoiceDetailInput, nullable: true }) input?: UserListInvoiceDetailInput,
  ) {
    return this.service.userInvoiceDetails(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountInvoiceDetails(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListInvoiceDetailInput, nullable: true }) input?: UserListInvoiceDetailInput,
  ) {
    return this.service.userCountInvoiceDetails(user.id, input)
  }

  @Query(() => [InvoiceDetail], { nullable: true })
  userSelectInvoiceDetails(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListInvoiceDetailInput, nullable: true }) input?: UserListInvoiceDetailInput,
  ) {
    return this.service.userSelectInvoiceDetails(user.id, input)
  }







  @Query(() => InvoiceDetail, { nullable: true })
  userInvoiceDetail(@CtxUser() user: User, @Args('invoiceDetailId') invoiceDetailId: string) {
    return this.service.userInvoiceDetail(user.id, invoiceDetailId)
  }

  @Mutation(() => InvoiceDetail, { nullable: true })
  userCreateInvoiceDetail(@CtxUser() user: User, @Args('input') input: UserCreateInvoiceDetailInput,) {
    return this.service.userCreateInvoiceDetail(user.id, input)
  }

  @Mutation(() => InvoiceDetail, { nullable: true })
  userUpdateInvoiceDetail(
    @CtxUser() user: User,
    @Args('invoiceDetailId') invoiceDetailId: string,
    @Args('input') input: UserUpdateInvoiceDetailInput,
  ) {
    return this.service.userUpdateInvoiceDetail(user.id, invoiceDetailId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateInvoiceDetails(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateInvoiceDetailsInput,
  ) {
    return this.service.userUpdateInvoiceDetails(user.id, input)
  }

  @Mutation(() => InvoiceDetail, { nullable: true })
  userDeleteInvoiceDetail(@CtxUser() user: User, @Args('invoiceDetailId') invoiceDetailId: string) {
    return this.service.userDeleteInvoiceDetail(user.id, invoiceDetailId)
  }
}

