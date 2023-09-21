
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreatePaymentInput } from './dto/admin-create-payment.input'
import { AdminListPaymentInput } from './dto/admin-list-payment.input'
import { AdminListBatchControlInput } from '@case-clinical/api/batch-control/data-access'
import { AdminListBankInput } from '@case-clinical/api/bank/data-access'
import { AdminListPayorTypeInput } from '@case-clinical/api/payor-type/data-access'
import { AdminListPaymentTypeInput } from '@case-clinical/api/payment-type/data-access'
import { AdminListPaymentApplicationMethodInput } from '@case-clinical/api/payment-application-method/data-access'
import { AdminUpdatePaymentInput } from './dto/admin-update-payment.input'

@Injectable()
export class ApiPaymentDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminPayments(adminId: string, input?: AdminListPaymentInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.payment.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {batchControl: true, bank: true, payorType: true, paymentType: true, paymentApplicationMethod: true}
    })
  }

  async adminCountPayments(adminId: string, input?: AdminListPaymentInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.payment.count(
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

  
  

  async adminPayment(adminId: string, paymentId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.payment.findUnique({ where: { id: paymentId } , include: {batchControl: true, bank: true, payorType: true, paymentType: true, paymentApplicationMethod: true, caseAccountPayments: true} })
  }

  async checkPaymentExist(paymentName: string) {
    try {
      return this.data.payment.findMany({ where: { name: paymentName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreatePayment(adminId: string, input: AdminCreatePaymentInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const paymentData = await this.checkPaymentExist(input.name)

      if (paymentData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.payment.create({
          data: { 
      
                batchControl: 
                input.batchControlId != null
                ? {
                        connect:  { 
                            id: input.batchControlId
                        }
                    }: undefined,  
                bank: 
                input.bankId != null
                ? {
                        connect:  { 
                            id: input.bankId
                        }
                    }: undefined,  
                payorType: 
                input.payorTypeId != null
                ? {
                        connect:  { 
                            id: input.payorTypeId
                        }
                    }: undefined,  
                paymentType: 
                input.paymentTypeId != null
                ? {
                        connect:  { 
                            id: input.paymentTypeId
                        }
                    }: undefined,  
                paymentApplicationMethod: 
                input.paymentApplicationMethodId != null
                ? {
                        connect:  { 
                            id: input.paymentApplicationMethodId
                        }
                    }: undefined,paidOn: input.paidOn, 
name: input.name, 
amount: input.amount, 
collected: input.collected, 
dac: input.dac, 
isPartial: input.isPartial, 
dateReceived: input.dateReceived, 
memo: input.memo, 
createdBy: input.createdBy, 
dateCreated: input.dateCreated, 
securitizationGroup: input.securitizationGroup, 

    }
    , include: {batchControl: true, bank: true, payorType: true, paymentType: true, paymentApplicationMethod: true, caseAccountPayments: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdatePayment(adminId: string, paymentId, input: AdminUpdatePaymentInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.payment.update({
      where: { id: paymentId },
      data: {
  
                batchControl: 
                input.batchControlId != null
                ? {
                        connect:  { 
                            id: input.batchControlId
                        }
                    }: undefined,  
                bank: 
                input.bankId != null
                ? {
                        connect:  { 
                            id: input.bankId
                        }
                    }: undefined,  
                payorType: 
                input.payorTypeId != null
                ? {
                        connect:  { 
                            id: input.payorTypeId
                        }
                    }: undefined,  
                paymentType: 
                input.paymentTypeId != null
                ? {
                        connect:  { 
                            id: input.paymentTypeId
                        }
                    }: undefined,  
                paymentApplicationMethod: 
                input.paymentApplicationMethodId != null
                ? {
                        connect:  { 
                            id: input.paymentApplicationMethodId
                        }
                    }: undefined,paidOn: input.paidOn, 
name: input.name, 
amount: input.amount, 
collected: input.collected, 
dac: input.dac, 
isPartial: input.isPartial, 
dateReceived: input.dateReceived, 
memo: input.memo, 
createdBy: input.createdBy, 
dateCreated: input.dateCreated, 
securitizationGroup: input.securitizationGroup, 

}
, include: {batchControl: true, bank: true, payorType: true, paymentType: true, paymentApplicationMethod: true, caseAccountPayments: true} 
    })
  }

  async adminDeletePayment(adminId: string, paymentId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.payment.delete({ where: { id: paymentId } })
  }
}

