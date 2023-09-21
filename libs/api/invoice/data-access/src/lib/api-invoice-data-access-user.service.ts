
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateInvoiceInput } from './dto/user-create-invoice.input'
import { UserListInvoiceInput } from './dto/user-list-invoice.input'
import { UserUpdateInvoiceInput } from './dto/user-update-invoice.input'
import { UserUpdateInvoicesInput } from './dto/user-update-invoices.input'

import { UserListOrganizationInput } from '@case-clinical/api/organization/data-access'
import { UserListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'

@Injectable()
export class ApiInvoiceDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userInvoices(userId: string, input?: UserListInvoiceInput) {
    const name = input?.name ? input.name : undefined
    const user = await this.data.user.findUnique({ where: { id: userId } })

    let clinicalProviderIds;
    if(input.clinicalProviderId) clinicalProviderIds = [ input.clinicalProviderId ];
    else if(user.vendorId) {
      clinicalProviderIds = ((await this.data.clinicalProvider.findMany({ where: { vendorId: user.vendorId } })).flatMap((el) => el.id));
    }

    if(user.attorneyId) {
      const attorney = await this.data.attorney.findUnique({ where: { id: user.attorneyId } });
      input.firmId = attorney.firmId;
    }

    let legalCaseIds;
    if(input?.attorneyId) {
      legalCaseIds = (await this.data.legalCase.findMany({ where: { attorneyId: input?.attorneyId } })).flatMap((el) => el.id);
    } else if(input?.firmId) {
      legalCaseIds = (await this.data.legalCase.findMany({ where: { attorney: { firmId: input?.firmId } } })).flatMap((el) => el.id);
    } else if(input?.legalCaseId) {
      legalCaseIds = [ input?.legalCaseId ]
    }

    return this.data.invoice.findMany({
      where: {
            AND: [{
            name: { contains: name },
            organizationId: input?.organizationId,
            clinicalProviderId: clinicalProviderIds?.length > 0 ? {
              in: clinicalProviderIds
            } : undefined,
            invoiceId: input?.invoiceId,
legalCaseId: legalCaseIds ? { in: legalCaseIds } : undefined }]
          },
      take: input?.limit,
      skip: input?.skip , include: {billingOrganization: true, invoice: true, clinicalProvider: true, legalCase: {include: {patient: true}}}
    })
  }


  async userSelectInvoices(userId: string, input?: UserListInvoiceInput) {
    const name = input?.name ? input.name : undefined
    const user = await this.data.user.findUnique({ where: { id: userId } })

    let clinicalProviderIds;
    if(input.clinicalProviderId) clinicalProviderIds = [ input.clinicalProviderId ];
    else if(user.vendorId) {
      clinicalProviderIds = ((await this.data.clinicalProvider.findMany({ where: { vendorId: user.vendorId } })).flatMap((el) => el.id));
    }

    if(user.attorneyId) {
      const attorney = await this.data.attorney.findUnique({ where: { id: user.attorneyId } });
      input.firmId = attorney.firmId;
    }

    let legalCaseIds;
    if(input?.attorneyId) {
      legalCaseIds = (await this.data.legalCase.findMany({ where: { attorneyId: input?.attorneyId } })).flatMap((el) => el.id);
    } else if(input?.firmId) {
      legalCaseIds = (await this.data.legalCase.findMany({ where: { attorney: { firmId: input?.firmId } } })).flatMap((el) => el.id);
    } else if(input?.legalCaseId) {
      legalCaseIds = [ input?.legalCaseId ]
    }

    return this.data.invoice.findMany({
      where: {
        AND: [{
        name: { contains: name },
        organizationId: input?.organizationId,
        clinicalProviderId: clinicalProviderIds?.length > 0 ? {
          in: clinicalProviderIds
        } : undefined,
        invoiceId: input?.invoiceId,
legalCaseId: legalCaseIds ? { in: legalCaseIds } : undefined }]
      },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountInvoices(userId: string, input?: UserListInvoiceInput): Promise<CorePaging> {
    const name = input?.name ? input.name : undefined
    const user = await this.data.user.findUnique({ where: { id: userId } })

    let clinicalProviderIds;
    if(input.clinicalProviderId) clinicalProviderIds = [ input.clinicalProviderId ];
    else if(user.vendorId) {
      clinicalProviderIds = ((await this.data.clinicalProvider.findMany({ where: { vendorId: user.vendorId } })).flatMap((el) => el.id));
    }

    if(user.attorneyId) {
      const attorney = await this.data.attorney.findUnique({ where: { id: user.attorneyId } });
      input.firmId = attorney.firmId;
    }

    let legalCaseIds;
    if(input?.attorneyId) {
      legalCaseIds = (await this.data.legalCase.findMany({ where: { attorneyId: input?.attorneyId } })).flatMap((el) => el.id);
    } else if(input?.firmId) {
      legalCaseIds = (await this.data.legalCase.findMany({ where: { attorney: { firmId: input?.firmId } } })).flatMap((el) => el.id);
    } else if(input?.legalCaseId) {
      legalCaseIds = [ input?.legalCaseId ]
    }

    const total = await this.data.invoice.count(
    {
      where: {
        AND: [{
        name: { contains: name },
        organizationId: input?.organizationId,
        clinicalProviderId: clinicalProviderIds?.length > 0 ? {
          in: clinicalProviderIds
        } : undefined,
        invoiceId: input?.invoiceId,
legalCaseId: legalCaseIds ? { in: legalCaseIds } : undefined }]
      },
    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userInvoice(userId: string, invoiceId) {

    return this.data.invoice.findUnique({ where: { id: invoiceId } , include: {
      billingOrganization: true,
      legalCase: true,
      clinicalProvider: true,
      invoice:true,
      details: {
        include:{
          invoice: true
        }
      }
    }  })
  }

  async checkInvoiceExist(invoiceName: string) {
    try {
      return this.data.invoice.findMany({ where: { name: invoiceName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateInvoice(userId: string, input: UserCreateInvoiceInput) {
    const sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const invoiceData = await this.checkInvoiceExist(input.name)

        if (invoiceData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }

        if(input.invoice){
          const invoiceId = (await this.data.userCreateDocument(userId, input.invoice)).id
          if(invoiceId){
            input.invoiceId = invoiceId
         }
        }

    await this.data.logEvent(sendingUser, true, 'Invoice', 'Create', input)

    const invoice = await this.data.invoice.create({
      data: {

                billingOrganization:
                input.organizationId != null
                ? {
                        connect:  {
                            id: input.organizationId
                        }
                    }: undefined,
                clinicalProvider: input.clinicalProviderId
                ? {
                  connect: { id: input.clinicalProviderId }
                } : undefined,
                invoice:
                input.invoiceId != null
                ? {
                        connect:  {
                            id: input.invoiceId
                        }
                    }: undefined,
                legalCase:
                input.legalCaseId != null
                ? {
                        connect:  {
                            id: input.legalCaseId
                        }
                    }: undefined,name: input.name,
invoiceNumber: input.invoiceNumber,
amount: input.amount,
paid: input.paid,
due: input.due,

}
, include: {billingOrganization: true, clinicalProvider: true, legalCase: true, details: true, invoice: true}
    })

    await this.data.logEvent(sendingUser, false, 'Invoice', 'Create', invoice)

    return invoice

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Invoice')
    }

  }





  async userUpdateInvoice(userId: string, invoiceId: string, input: UserUpdateInvoiceInput) {

    const sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!invoiceId) {
        throw new BadRequestException('Invoice Id is required')
      } else {

      const invoiceData = await this.checkInvoiceExist(input.name)

      if (invoiceData.length > 0) {
        if (invoiceData[0].id != invoiceId) {
          throw new ConflictException("Record must be unique.")
        }
      }

      if(input.invoice){
        const invoiceId = (await this.data.userCreateDocument(userId, input.invoice)).id
        if(invoiceId){
          input.invoiceId = invoiceId
       }
      }

    await this.data.logEvent(sendingUser, true, 'Invoice', 'Update', input)

    const invoice = this.data.invoice.update({
      where: { id: invoiceId },
      data: {

                billingOrganization:
                input.organizationId != null
                ? {
                        connect:  {
                            id: input.organizationId
                        }
                    }: undefined,
                clinicalProvider: input.clinicalProviderId
                ? {
                  connect: { id: input.clinicalProviderId }
                } : undefined,
                invoice:
                input.invoiceId != null
                ? {
                        connect:  {
                            id: input.invoiceId
                        }
                    }: undefined,
                legalCase:
                input.legalCaseId != null
                ? {
                        connect:  {
                            id: input.legalCaseId
                        }
                    }: undefined,name: input.name,
invoiceNumber: input.invoiceNumber,
amount: input.amount,
paid: input.paid,
due: input.due,

}
, include: {billingOrganization: true, clinicalProvider: true, legalCase: true,invoice: true, details: true}
    })

    await this.data.logEvent(sendingUser, false, 'Invoice', 'Update', invoice)

    return invoice

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Invoice')
    }
  }

  async userUpdateInvoices(userId: string, input: UserUpdateInvoicesInput): Promise<UpdateResult> {
    const total = input.invoices.length
    const updated = []
    const created = []
    const failed = []

    for (const key in input.invoices) {
      const inputData = input.invoices[key]

      const data = {
        id: inputData.id,
name: inputData.name,
invoiceNumber: inputData.invoiceNumber,
amount: inputData.amount,
paid: inputData.paid,
due: inputData.due,
organizationId: inputData.organizationId,
clinicalProviderId: inputData.clinicalProviderId,
legalCaseId: inputData.legalCaseId,
invoiceId: inputData.invoiceId,
      }

      const invoiceData = await this.checkInvoiceExist(inputData.name)

      if (invoiceData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.invoice.upsert({
            where: { id: inputData.id || '' },
            create: data,
            update: data,
          })

          if (result.id === inputData.id) updated.push(result)
          else {
            created.push(result)
          }
        } catch (error) {
          failed.push(inputData)
        }
      }
    }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed),
    }
  }


  async userDeleteInvoice(userId: string, invoiceId: string) {
    const sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!invoiceId) {
        throw new BadRequestException('Invoice Id is required')
      } else {


        const invoiceDetailCount = await this.data.invoiceDetail.count({ where: { invoiceId: invoiceId }})
        if(invoiceDetailCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Invoice Detail')
        }


        await this.data.logEvent(sendingUser, true, 'Invoice', 'Delete', invoiceId)

        const invoice = this.data.invoice.delete({
          where: { id: invoiceId }
        })

        await this.data.logEvent(sendingUser, false, 'Invoice', 'Delete', invoice)

        return invoice

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }

        throw new InternalServerErrorException('Error in deleting Invoice')
    }
  }
}

