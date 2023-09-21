
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateInvoiceDetailInput,
  AdminListInvoiceDetailInput,
  AdminUpdateInvoiceDetailInput,
  ApiInvoiceDetailDataAccessAdminService,
  InvoiceDetail
} from '@case-clinical/api/invoice-detail/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListInvoiceInput, Invoice } from '@case-clinical/api/invoice/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiInvoiceDetailFeatureAdminResolver {
  constructor(private readonly service: ApiInvoiceDetailDataAccessAdminService) {}

  @Query(() => [InvoiceDetail], { nullable: true })
  adminInvoiceDetails(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListInvoiceDetailInput, nullable: true }) input?: AdminListInvoiceDetailInput,
  ) {
    return this.service.adminInvoiceDetails(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountInvoiceDetails(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListInvoiceDetailInput, nullable: true }) input?: AdminListInvoiceDetailInput,
  ) {
    return this.service.adminCountInvoiceDetails(admin.id, input)
  }





  @Query(() => InvoiceDetail, { nullable: true })
  adminInvoiceDetail(@CtxUser() admin: User, @Args('invoiceDetailId') invoiceDetailId: string) {
    return this.service.adminInvoiceDetail(admin.id, invoiceDetailId)
  }

  @Mutation(() => InvoiceDetail, { nullable: true })
  adminCreateInvoiceDetail(@CtxUser() admin: User, @Args('input') input: AdminCreateInvoiceDetailInput,) {
    return this.service.adminCreateInvoiceDetail(admin.id, input)
  }

  @Mutation(() => InvoiceDetail, { nullable: true })
  adminUpdateInvoiceDetail(
    @CtxUser() admin: User,
    @Args('invoiceDetailId') invoiceDetailId: string,
    @Args('input') input: AdminUpdateInvoiceDetailInput,
  ) {
    return this.service.adminUpdateInvoiceDetail(admin.id, invoiceDetailId, input)
  }

  @Mutation(() => InvoiceDetail, { nullable: true })
  adminDeleteInvoiceDetail(@CtxUser() admin: User, @Args('invoiceDetailId') invoiceDetailId: string) {
    return this.service.adminDeleteInvoiceDetail(admin.id, invoiceDetailId)
  }
}

