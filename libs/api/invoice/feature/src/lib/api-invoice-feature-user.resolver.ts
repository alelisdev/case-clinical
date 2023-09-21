
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateInvoiceInput,
  UserListInvoiceInput,
  UserUpdateInvoiceInput,
  UserUpdateInvoicesInput,
  ApiInvoiceDataAccessUserService,
  Invoice,
} from '@case-clinical/api/invoice/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListOrganizationInput, Organization } from '@case-clinical/api/organization/data-access'
import { UserListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'
import { UserListDocumentInput, Document } from '@case-clinical/api/document/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiInvoiceFeatureUserResolver {
  constructor(private readonly service: ApiInvoiceDataAccessUserService) {}

  @Query(() => [Invoice], { nullable: true })
  userInvoices(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListInvoiceInput, nullable: true }) input?: UserListInvoiceInput,
  ) {
    return this.service.userInvoices(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountInvoices(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListInvoiceInput, nullable: true }) input?: UserListInvoiceInput,
  ) {
    return this.service.userCountInvoices(user.id, input)
  }

  @Query(() => [Invoice], { nullable: true })
  userSelectInvoices(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListInvoiceInput, nullable: true }) input?: UserListInvoiceInput,
  ) {
    return this.service.userSelectInvoices(user.id, input)
  }







  @Query(() => Invoice, { nullable: true })
  userInvoice(@CtxUser() user: User, @Args('invoiceId') invoiceId: string) {
    return this.service.userInvoice(user.id, invoiceId)
  }

  @Mutation(() => Invoice, { nullable: true })
  userCreateInvoice(@CtxUser() user: User, @Args('input') input: UserCreateInvoiceInput,) {
    return this.service.userCreateInvoice(user.id, input)
  }

  @Mutation(() => Invoice, { nullable: true })
  userUpdateInvoice(
    @CtxUser() user: User,
    @Args('invoiceId') invoiceId: string,
    @Args('input') input: UserUpdateInvoiceInput,
  ) {
    return this.service.userUpdateInvoice(user.id, invoiceId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateInvoices(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateInvoicesInput,
  ) {
    return this.service.userUpdateInvoices(user.id, input)
  }

  @Mutation(() => Invoice, { nullable: true })
  userDeleteInvoice(@CtxUser() user: User, @Args('invoiceId') invoiceId: string) {
    return this.service.userDeleteInvoice(user.id, invoiceId)
  }
}

