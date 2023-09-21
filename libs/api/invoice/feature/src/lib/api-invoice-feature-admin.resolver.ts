
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateInvoiceInput,
  AdminListInvoiceInput,
  AdminUpdateInvoiceInput,
  ApiInvoiceDataAccessAdminService,
  Invoice
} from '@case-clinical/api/invoice/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListOrganizationInput, Organization } from '@case-clinical/api/organization/data-access'
import { AdminListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'
import { AdminListDocumentInput, Document } from '@case-clinical/api/document/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiInvoiceFeatureAdminResolver {
  constructor(private readonly service: ApiInvoiceDataAccessAdminService) {}

  @Query(() => [Invoice], { nullable: true })
  adminInvoices(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListInvoiceInput, nullable: true }) input?: AdminListInvoiceInput,
  ) {
    return this.service.adminInvoices(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountInvoices(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListInvoiceInput, nullable: true }) input?: AdminListInvoiceInput,
  ) {
    return this.service.adminCountInvoices(admin.id, input)
  }





  @Query(() => Invoice, { nullable: true })
  adminInvoice(@CtxUser() admin: User, @Args('invoiceId') invoiceId: string) {
    return this.service.adminInvoice(admin.id, invoiceId)
  }

  @Mutation(() => Invoice, { nullable: true })
  adminCreateInvoice(@CtxUser() admin: User, @Args('input') input: AdminCreateInvoiceInput,) {
    return this.service.adminCreateInvoice(admin.id, input)
  }

  @Mutation(() => Invoice, { nullable: true })
  adminUpdateInvoice(
    @CtxUser() admin: User,
    @Args('invoiceId') invoiceId: string,
    @Args('input') input: AdminUpdateInvoiceInput,
  ) {
    return this.service.adminUpdateInvoice(admin.id, invoiceId, input)
  }

  @Mutation(() => Invoice, { nullable: true })
  adminDeleteInvoice(@CtxUser() admin: User, @Args('invoiceId') invoiceId: string) {
    return this.service.adminDeleteInvoice(admin.id, invoiceId)
  }
}

