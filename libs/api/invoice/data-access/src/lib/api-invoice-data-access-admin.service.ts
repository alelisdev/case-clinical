
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateInvoiceInput } from './dto/admin-create-invoice.input'
import { AdminListInvoiceInput } from './dto/admin-list-invoice.input'
import { AdminListOrganizationInput } from '@case-clinical/api/organization/data-access'
import { AdminListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { AdminListDocumentInput } from '@case-clinical/api/document/data-access'
import { AdminUpdateInvoiceInput } from './dto/admin-update-invoice.input'

@Injectable()
export class ApiInvoiceDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminInvoices(adminId: string, input?: AdminListInvoiceInput) {
    await this.data.ensureAdminUser(adminId)

    const name = input?.name ? input.name : undefined

    return this.data.invoice.findMany({
      where: {
            name: {
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {billingOrganization: true, clinicalProvider: true, legalCase: true, invoice: true}
    })
  }

  async adminCountInvoices(adminId: string, input?: AdminListInvoiceInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    const name = input?.name ? input.name : undefined

    const total = await this.data.invoice.count(
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




  async adminInvoice(adminId: string, invoiceId) {
    await this.data.ensureAdminUser(adminId)
    const adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.invoice.findUnique({ where: { id: invoiceId } , include: {billingOrganization: true, legalCase: true, clinicalProvider: true, invoice: true, details: true} })
  }

  async checkInvoiceExist(invoiceName: string) {
    try {
      return this.data.invoice.findMany({ where: { name: invoiceName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateInvoice(adminId: string, input: AdminCreateInvoiceInput) {
    await this.data.ensureAdminUser(adminId)

    const adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const invoiceData = await this.checkInvoiceExist(input.name)

      if (invoiceData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.invoice.create({
          data: {

                billingOrganization:
                input.organizationId != null
                ? {
                        connect:  {
                            id: input.organizationId
                        }
                    }: undefined,
                legalCase:
                input.legalCaseId != null
                ? {
                        connect:  {
                            id: input.legalCaseId
                        }
                    }: undefined,
                clinicalProvider: input.clinicalProviderId ? {
                  connect: { id: input.clinicalProviderId }
                } : undefined,
                invoice:
                input.invoiceId != null
                ? {
                        connect:  {
                            id: input.invoiceId
                        }
                    }: undefined,name: input.name,
invoiceNumber: input.invoiceNumber,
amount: input.amount,
paid: input.paid,
due: input.due,

    }
    , include: {billingOrganization: true, legalCase: true, clinicalProvider: true, invoice: true, details: true}
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateInvoice(adminId: string, invoiceId, input: AdminUpdateInvoiceInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.invoice.update({
      where: { id: invoiceId },
      data: {

                billingOrganization:
                input.organizationId != null
                ? {
                        connect:  {
                            id: input.organizationId
                        }
                    }: undefined,
                clinicalProvider: input.clinicalProviderId ? {
                  connect: { id: input.clinicalProviderId }
                } : undefined,
                legalCase:
                input.legalCaseId != null
                ? {
                        connect:  {
                            id: input.legalCaseId
                        }
                    }: undefined,
                invoice:
                input.invoiceId != null
                ? {
                        connect:  {
                            id: input.invoiceId
                        }
                    }: undefined,name: input.name,
invoiceNumber: input.invoiceNumber,
amount: input.amount,
paid: input.paid,
due: input.due,

}
, include: {billingOrganization: true, legalCase: true, clinicalProvider: true, invoice: true, details: true}
    })
  }

  async adminDeleteInvoice(adminId: string, invoiceId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.invoice.delete({ where: { id: invoiceId } })
  }
}

