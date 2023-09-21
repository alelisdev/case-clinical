
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateInvoiceDetailInput } from './dto/admin-create-invoice-detail.input'
import { AdminListInvoiceDetailInput } from './dto/admin-list-invoice-detail.input'
import { AdminListInvoiceInput } from '@case-clinical/api/invoice/data-access'
import { AdminUpdateInvoiceDetailInput } from './dto/admin-update-invoice-detail.input'

@Injectable()
export class ApiInvoiceDetailDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminInvoiceDetails(adminId: string, input?: AdminListInvoiceDetailInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.invoiceDetail.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {invoice: true}
    })
  }

  async adminCountInvoiceDetails(adminId: string, input?: AdminListInvoiceDetailInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.invoiceDetail.count(
    {
      where: { 
            name: { 
                contains: name
            }
          }
        }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  
  

  async adminInvoiceDetail(adminId: string, invoiceDetailId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.invoiceDetail.findUnique({ where: { id: invoiceDetailId } , include: {invoice: true, caseAccounts: true} })
  }

  async checkInvoiceDetailExist(invoiceDetailName: string) {
    try {
      return this.data.invoiceDetail.findMany({ where: { name: invoiceDetailName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateInvoiceDetail(adminId: string, input: AdminCreateInvoiceDetailInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const invoiceDetailData = await this.checkInvoiceDetailExist(input.name)

      if (invoiceDetailData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.invoiceDetail.create({
          data: { 
      
                invoice: 
                input.invoiceId != null
                ? {
                        connect:  { 
                            id: input.invoiceId
                        }
                    }: undefined,name: input.name, 
dateOfService: input.dateOfService, 
providerName: input.providerName, 
procedureDescription: input.procedureDescription, 
quantity: input.quantity, 
charges: input.charges, 
lineTotal: input.lineTotal, 

    }
    , include: {invoice: true, caseAccounts: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateInvoiceDetail(adminId: string, invoiceDetailId, input: AdminUpdateInvoiceDetailInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.invoiceDetail.update({
      where: { id: invoiceDetailId },
      data: {
  
                invoice: 
                input.invoiceId != null
                ? {
                        connect:  { 
                            id: input.invoiceId
                        }
                    }: undefined,name: input.name, 
dateOfService: input.dateOfService, 
providerName: input.providerName, 
procedureDescription: input.procedureDescription, 
quantity: input.quantity, 
charges: input.charges, 
lineTotal: input.lineTotal, 

}
, include: {invoice: true, caseAccounts: true} 
    })
  }

  async adminDeleteInvoiceDetail(adminId: string, invoiceDetailId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.invoiceDetail.delete({ where: { id: invoiceDetailId } })
  }
}

