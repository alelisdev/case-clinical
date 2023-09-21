
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListInvoiceDetailInput,
  ApiInvoiceDetailDataAccessPublicService,
  InvoiceDetail,
} from '@case-clinical/api/invoice-detail/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiInvoiceDetailFeaturePublicResolver {
  constructor(private readonly service: ApiInvoiceDetailDataAccessPublicService) {}
           
  @Query(() => [InvoiceDetail], { nullable: true })
  publicInvoiceDetails(
    @Args({ name: 'input', type: () => UserListInvoiceDetailInput, nullable: true }) input?: UserListInvoiceDetailInput,
  ) {
    return this.service.publicInvoiceDetails(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountInvoiceDetails(
    @Args({ name: 'input', type: () => UserListInvoiceDetailInput, nullable: true }) input?: UserListInvoiceDetailInput,
  ) {
    return this.service.publicCountInvoiceDetails(input)
  }

  @Query(() => [InvoiceDetail], { nullable: true })
  publicSelectInvoiceDetails(
    @Args({ name: 'input', type: () => UserListInvoiceDetailInput, nullable: true }) input?: UserListInvoiceDetailInput,
  ) {
    return this.service.publicSelectInvoiceDetails(input)
  }

  @Query(() => InvoiceDetail, { nullable: true })
  publicInvoiceDetail(@Args('invoiceDetailId') invoiceDetailId: string) {
    return this.service.publicInvoiceDetail(invoiceDetailId)
  }
}
