
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateCaseAccountPaymentInput } from './dto/user-create-case-account-payment.input'
import { UserListCaseAccountPaymentInput } from './dto/user-list-case-account-payment.input'
import { UserUpdateCaseAccountPaymentInput } from './dto/user-update-case-account-payment.input'
import { UserUpdateCaseAccountPaymentsInput } from './dto/user-update-case-account-payments.input'

import { UserListPaymentInput } from '@case-clinical/api/payment/data-access'
import { UserListCaseAccountInput } from '@case-clinical/api/case-account/data-access'

@Injectable()
export class ApiCaseAccountPaymentDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userCaseAccountPayments(userId: string, input?: UserListCaseAccountPaymentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.caseAccountPayment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            paymentId: input?.paymentId,
caseAccountId: input?.caseAccountId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {payment: true, caseAccount: true}
    })
  }

  async userSelectCaseAccountPayments(userId: string, input?: UserListCaseAccountPaymentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.caseAccountPayment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            paymentId: input?.paymentId,
caseAccountId: input?.caseAccountId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountCaseAccountPayments(userId: string, input?: UserListCaseAccountPaymentInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.caseAccountPayment.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            paymentId: input?.paymentId,
caseAccountId: input?.caseAccountId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userCaseAccountPayment(userId: string, caseAccountPaymentId) {

    return this.data.caseAccountPayment.findUnique({ where: { id: caseAccountPaymentId } , include: {payment: true, caseAccount: true}  })
  }

  async checkCaseAccountPaymentExist(caseAccountPaymentName: string) {
    try {
      return this.data.caseAccountPayment.findMany({ where: { name: caseAccountPaymentName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateCaseAccountPayment(userId: string, input: UserCreateCaseAccountPaymentInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const caseAccountPaymentData = await this.checkCaseAccountPaymentExist(input.name)

        if (caseAccountPaymentData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'CaseAccountPayment', 'Create', input)

    let caseAccountPayment = await this.data.caseAccountPayment.create({
      data: { 
  
                payment: 
                input.paymentId != null
                ? {
                        connect:  { 
                            id: input.paymentId
                        }
                    }: undefined,  
                caseAccount: 
                input.caseAccountId != null
                ? {
                        connect:  { 
                            id: input.caseAccountId
                        }
                    }: undefined,name: input.name, 
amountApplied: input.amountApplied, 

}
, include: {payment: true, caseAccount: true} 
    })

    await this.data.logEvent(sendingUser, false, 'CaseAccountPayment', 'Create', caseAccountPayment)

    return caseAccountPayment

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Case Account Payment')
    }

  }


  
  

  async userUpdateCaseAccountPayment(userId: string, caseAccountPaymentId: string, input: UserUpdateCaseAccountPaymentInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!caseAccountPaymentId) {
        throw new BadRequestException('Case Account Payment Id is required')
      } else {

      const caseAccountPaymentData = await this.checkCaseAccountPaymentExist(input.name)

      if (caseAccountPaymentData.length > 0) {
        if (caseAccountPaymentData[0].id != caseAccountPaymentId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'CaseAccountPayment', 'Update', input)

    let caseAccountPayment = this.data.caseAccountPayment.update({
      where: { id: caseAccountPaymentId },
      data: {
  
                payment: 
                input.paymentId != null
                ? {
                        connect:  { 
                            id: input.paymentId
                        }
                    }: undefined,  
                caseAccount: 
                input.caseAccountId != null
                ? {
                        connect:  { 
                            id: input.caseAccountId
                        }
                    }: undefined,name: input.name, 
amountApplied: input.amountApplied, 

}
, include: {payment: true, caseAccount: true} 
    })

    await this.data.logEvent(sendingUser, false, 'CaseAccountPayment', 'Update', caseAccountPayment)

    return caseAccountPayment

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Case Account Payment')
    }
  }

  async userUpdateCaseAccountPayments(userId: string, input: UserUpdateCaseAccountPaymentsInput): Promise<UpdateResult> {
    const total = input.caseAccountPayments.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.caseAccountPayments) {
      const inputData = input.caseAccountPayments[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
amountApplied: inputData.amountApplied, 
paymentId: inputData.paymentId, 
caseAccountId: inputData.caseAccountId, 

      }

      const caseAccountPaymentData = await this.checkCaseAccountPaymentExist(inputData.name)

      if (caseAccountPaymentData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.caseAccountPayment.upsert({
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


  async userDeleteCaseAccountPayment(userId: string, caseAccountPaymentId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!caseAccountPaymentId) {
        throw new BadRequestException('Case Account Payment Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'CaseAccountPayment', 'Delete', caseAccountPaymentId)

        let caseAccountPayment = this.data.caseAccountPayment.delete({
          where: { id: caseAccountPaymentId }
        })

        await this.data.logEvent(sendingUser, false, 'CaseAccountPayment', 'Delete', caseAccountPayment)

        return caseAccountPayment

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Case Account Payment')
    }
  }
}

