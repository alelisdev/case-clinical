
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreatePaymentInput } from './dto/user-create-payment.input'
import { UserListPaymentInput } from './dto/user-list-payment.input'
import { UserUpdatePaymentInput } from './dto/user-update-payment.input'
import { UserUpdatePaymentsInput } from './dto/user-update-payments.input'

import { UserListBatchControlInput } from '@case-clinical/api/batch-control/data-access'
import { UserListBankInput } from '@case-clinical/api/bank/data-access'
import { UserListPayorTypeInput } from '@case-clinical/api/payor-type/data-access'
import { UserListPaymentTypeInput } from '@case-clinical/api/payment-type/data-access'
import { UserListPaymentApplicationMethodInput } from '@case-clinical/api/payment-application-method/data-access'

@Injectable()
export class ApiPaymentDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userPayments(userId: string, input?: UserListPaymentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.payment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            batchControlId: input?.batchControlId,
bankId: input?.bankId,
payorTypeId: input?.payorTypeId,
paymentTypeId: input?.paymentTypeId,
paymentApplicationMethodId: input?.paymentApplicationMethodId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {batchControl: true, bank: true, payorType: true, paymentType: true, paymentApplicationMethod: true}
    })
  }

  async userSelectPayments(userId: string, input?: UserListPaymentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.payment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            batchControlId: input?.batchControlId,
bankId: input?.bankId,
payorTypeId: input?.payorTypeId,
paymentTypeId: input?.paymentTypeId,
paymentApplicationMethodId: input?.paymentApplicationMethodId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountPayments(userId: string, input?: UserListPaymentInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.payment.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            batchControlId: input?.batchControlId,
bankId: input?.bankId,
payorTypeId: input?.payorTypeId,
paymentTypeId: input?.paymentTypeId,
paymentApplicationMethodId: input?.paymentApplicationMethodId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userPayment(userId: string, paymentId) {

    return this.data.payment.findUnique({ where: { id: paymentId } , include: {batchControl: true, bank: true, payorType: true, paymentType: true, paymentApplicationMethod: true, caseAccountPayments: {include: {payment: true, caseAccount: true}}}  })
  }

  async checkPaymentExist(paymentName: string) {
    try {
      return this.data.payment.findMany({ where: { name: paymentName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreatePayment(userId: string, input: UserCreatePaymentInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const paymentData = await this.checkPaymentExist(input.name)

        if (paymentData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Payment', 'Create', input)

    let payment = await this.data.payment.create({
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

    await this.data.logEvent(sendingUser, false, 'Payment', 'Create', payment)

    return payment

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Payment')
    }

  }


  
  

  async userUpdatePayment(userId: string, paymentId: string, input: UserUpdatePaymentInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!paymentId) {
        throw new BadRequestException('Payment Id is required')
      } else {

      const paymentData = await this.checkPaymentExist(input.name)

      if (paymentData.length > 0) {
        if (paymentData[0].id != paymentId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Payment', 'Update', input)

    let payment = this.data.payment.update({
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

    await this.data.logEvent(sendingUser, false, 'Payment', 'Update', payment)

    return payment

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Payment')
    }
  }

  async userUpdatePayments(userId: string, input: UserUpdatePaymentsInput): Promise<UpdateResult> {
    const total = input.payments.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.payments) {
      const inputData = input.payments[key]

      const data = {
        id: inputData.id, 
paidOn: inputData.paidOn, 
name: inputData.name, 
batchControlId: inputData.batchControlId, 
bankId: inputData.bankId, 
payorTypeId: inputData.payorTypeId, 
paymentTypeId: inputData.paymentTypeId, 
amount: inputData.amount, 
collected: inputData.collected, 
dac: inputData.dac, 
isPartial: inputData.isPartial, 
dateReceived: inputData.dateReceived, 
memo: inputData.memo, 
createdBy: inputData.createdBy, 
dateCreated: inputData.dateCreated, 
securitizationGroup: inputData.securitizationGroup, 
paymentApplicationMethodId: inputData.paymentApplicationMethodId, 

      }

      const paymentData = await this.checkPaymentExist(inputData.name)

      if (paymentData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.payment.upsert({
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


  async userDeletePayment(userId: string, paymentId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!paymentId) {
        throw new BadRequestException('Payment Id is required')
      } else {

        const caseAccountPaymentCount = await this.data.caseAccountPayment.count({ where: { paymentId: paymentId }})
        if(caseAccountPaymentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Case Account Payment')
        }

        await this.data.logEvent(sendingUser, true, 'Payment', 'Delete', paymentId)

        let payment = this.data.payment.delete({
          where: { id: paymentId }
        })

        await this.data.logEvent(sendingUser, false, 'Payment', 'Delete', payment)

        return payment

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Payment')
    }
  }
}

