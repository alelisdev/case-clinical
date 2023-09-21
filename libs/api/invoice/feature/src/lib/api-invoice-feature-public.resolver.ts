
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListInvoiceInput,
  ApiInvoiceDataAccessPublicService,
  Invoice,
} from '@case-clinical/api/invoice/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiInvoiceFeaturePublicResolver {
  constructor(private readonly service: ApiInvoiceDataAccessPublicService) {}
           
  @Query(() => [Invoice], { nullable: true })
  publicInvoices(
    @Args({ name: 'input', type: () => UserListInvoiceInput, nullable: true }) input?: UserListInvoiceInput,
  ) {
    return this.service.publicInvoices(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountInvoices(
    @Args({ name: 'input', type: () => UserListInvoiceInput, nullable: true }) input?: UserListInvoiceInput,
  ) {
    return this.service.publicCountInvoices(input)
  }

  @Query(() => [Invoice], { nullable: true })
  publicSelectInvoices(
    @Args({ name: 'input', type: () => UserListInvoiceInput, nullable: true }) input?: UserListInvoiceInput,
  ) {
    return this.service.publicSelectInvoices(input)
  }

  @Query(() => Invoice, { nullable: true })
  publicInvoice(@Args('invoiceId') invoiceId: string) {
    return this.service.publicInvoice(invoiceId)
  }
}
