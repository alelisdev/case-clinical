
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListInvoiceDetailInput } from './dto/user-list-invoice-detail.input'

@Injectable()
export class ApiInvoiceDetailDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicInvoiceDetails(input?: UserListInvoiceDetailInput) {
    let name = input?.name ? input.name : undefined

    return this.data.invoiceDetail.findMany({
      where: {
            AND: [{
            name: { contains: name },
            invoiceId: input.invoiceId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {invoice: true}
    })
  }

  async publicSelectInvoiceDetails(input?: UserListInvoiceDetailInput) {
    let name = input?.name ? input.name : undefined

    return this.data.invoiceDetail.findMany({
      where: {
            AND: [{
            name: { contains: name },
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

  async publicCountInvoiceDetails(input?: UserListInvoiceDetailInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.invoiceDetail.count(
    {
      where: {
            AND: [{
            name: { contains: name },
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

  async publicInvoiceDetail(invoiceDetailId) {

    return this.data.invoiceDetail.findUnique({ where: { id: invoiceDetailId } , include: {invoice: true, caseAccounts: true}  })
  }
}


