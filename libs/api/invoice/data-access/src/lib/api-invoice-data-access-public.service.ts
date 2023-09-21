
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListInvoiceInput } from './dto/user-list-invoice.input'

@Injectable()
export class ApiInvoiceDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicInvoices(input?: UserListInvoiceInput) {
    const name = input?.name ? input.name : undefined

    return this.data.invoice.findMany({
      where: {
            AND: [{
            name: { contains: name },
            organizationId: input.organizationId,
            clinicalProviderId: input.clinicalProviderId,
legalCaseId: input.legalCaseId,
invoiceId: input.invoiceId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {billingOrganization: true, clinicalProvider: true, legalCase: true, invoice: true}
    })
  }

  async publicSelectInvoices(input?: UserListInvoiceInput) {
    const name = input?.name ? input.name : undefined

    return this.data.invoice.findMany({
      where: {
            AND: [{
            name: { contains: name },
            organizationId: input.organizationId,
            clinicalProviderId: input.clinicalProviderId,
legalCaseId: input.legalCaseId,
invoiceId: input.invoiceId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountInvoices(input?: UserListInvoiceInput): Promise<CorePaging> {

    const name = input?.name ? input.name : undefined

    const total = await this.data.invoice.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            organizationId: input.organizationId,
            clinicalProviderId: input.clinicalProviderId,
legalCaseId: input.legalCaseId,
invoiceId: input.invoiceId,}]
          },
    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicInvoice(invoiceId) {

    return this.data.invoice.findUnique({ where: { id: invoiceId } , include: {billingOrganization: true, clinicalProvider: true, legalCase: true, invoice: true, details: true}  })
  }
}


