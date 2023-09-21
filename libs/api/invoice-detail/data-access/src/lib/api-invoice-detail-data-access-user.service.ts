
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateInvoiceDetailInput } from './dto/user-create-invoice-detail.input'
import { UserListInvoiceDetailInput } from './dto/user-list-invoice-detail.input'
import { UserUpdateInvoiceDetailInput } from './dto/user-update-invoice-detail.input'
import { UserUpdateInvoiceDetailsInput } from './dto/user-update-invoice-details.input'

import { UserListInvoiceInput } from '@case-clinical/api/invoice/data-access'

@Injectable()
export class ApiInvoiceDetailDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userInvoiceDetails(userId: string, input?: UserListInvoiceDetailInput) {
    let name = input?.name ? input.name : undefined

    return this.data.invoiceDetail.findMany({
      where: {
            AND: [{
            name: { contains: name },
            invoiceId: input?.invoiceId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {invoice: true}
    })
  }

  async userSelectInvoiceDetails(userId: string, input?: UserListInvoiceDetailInput) {
    let name = input?.name ? input.name : undefined

    return this.data.invoiceDetail.findMany({
      where: {
            AND: [{
            name: { contains: name },
            invoiceId: input?.invoiceId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountInvoiceDetails(userId: string, input?: UserListInvoiceDetailInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.invoiceDetail.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            invoiceId: input?.invoiceId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userInvoiceDetail(userId: string, invoiceDetailId) {

    return this.data.invoiceDetail.findUnique({ where: { id: invoiceDetailId } , include: {invoice: true, caseAccounts: true}  })
  }

  async checkInvoiceDetailExist(invoiceDetailName: string) {
    try {
      return this.data.invoiceDetail.findMany({ where: { name: invoiceDetailName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateInvoiceDetail(userId: string, input: UserCreateInvoiceDetailInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const invoiceDetailData = await this.checkInvoiceDetailExist(input.name)

        if (invoiceDetailData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'InvoiceDetail', 'Create', input)

    let invoiceDetail = await this.data.invoiceDetail.create({
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

    await this.data.logEvent(sendingUser, false, 'InvoiceDetail', 'Create', invoiceDetail)

    return invoiceDetail

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Invoice Detail')
    }

  }


  
  

  async userUpdateInvoiceDetail(userId: string, invoiceDetailId: string, input: UserUpdateInvoiceDetailInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!invoiceDetailId) {
        throw new BadRequestException('Invoice Detail Id is required')
      } else {

      const invoiceDetailData = await this.checkInvoiceDetailExist(input.name)

      if (invoiceDetailData.length > 0) {
        if (invoiceDetailData[0].id != invoiceDetailId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'InvoiceDetail', 'Update', input)

    let invoiceDetail = this.data.invoiceDetail.update({
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

    await this.data.logEvent(sendingUser, false, 'InvoiceDetail', 'Update', invoiceDetail)

    return invoiceDetail

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Invoice Detail')
    }
  }

  async userUpdateInvoiceDetails(userId: string, input: UserUpdateInvoiceDetailsInput): Promise<UpdateResult> {
    const total = input.invoiceDetails.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.invoiceDetails) {
      const inputData = input.invoiceDetails[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
invoiceId: inputData.invoiceId, 
dateOfService: inputData.dateOfService, 
providerName: inputData.providerName, 
procedureDescription: inputData.procedureDescription, 
quantity: inputData.quantity, 
charges: inputData.charges, 
lineTotal: inputData.lineTotal, 

      }

      const invoiceDetailData = await this.checkInvoiceDetailExist(inputData.name)

      if (invoiceDetailData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.invoiceDetail.upsert({
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


  async userDeleteInvoiceDetail(userId: string, invoiceDetailId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!invoiceDetailId) {
        throw new BadRequestException('Invoice Detail Id is required')
      } else {


        const caseAccountCount = await this.data.caseAccount.count({ where: { invoiceDetailId: invoiceDetailId }})
        if(caseAccountCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Case Account')
        }


        await this.data.logEvent(sendingUser, true, 'InvoiceDetail', 'Delete', invoiceDetailId)

        let invoiceDetail = this.data.invoiceDetail.delete({
          where: { id: invoiceDetailId }
        })

        await this.data.logEvent(sendingUser, false, 'InvoiceDetail', 'Delete', invoiceDetail)

        return invoiceDetail

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Invoice Detail')
    }
  }
}

