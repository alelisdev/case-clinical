
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreatePaymentApplicationMethodInput } from './dto/user-create-payment-application-method.input'
import { UserListPaymentApplicationMethodInput } from './dto/user-list-payment-application-method.input'
import { UserUpdatePaymentApplicationMethodInput } from './dto/user-update-payment-application-method.input'
import { UserUpdatePaymentApplicationMethodsInput } from './dto/user-update-payment-application-methods.input'



@Injectable()
export class ApiPaymentApplicationMethodDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userPaymentApplicationMethods(userId: string, input?: UserListPaymentApplicationMethodInput) {
    let name = input?.name ? input.name : undefined

    return this.data.paymentApplicationMethod.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectPaymentApplicationMethods(userId: string, input?: UserListPaymentApplicationMethodInput) {
    let name = input?.name ? input.name : undefined

    return this.data.paymentApplicationMethod.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountPaymentApplicationMethods(userId: string, input?: UserListPaymentApplicationMethodInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.paymentApplicationMethod.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userPaymentApplicationMethod(userId: string, paymentApplicationMethodId) {

    return this.data.paymentApplicationMethod.findUnique({ where: { id: paymentApplicationMethodId } , include: {payments: {include: {batchControl: true, bank: true, payorType: true, paymentType: true, paymentApplicationMethod: true}}}  })
  }

  async checkPaymentApplicationMethodExist(paymentApplicationMethodName: string) {
    try {
      return this.data.paymentApplicationMethod.findMany({ where: { name: paymentApplicationMethodName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreatePaymentApplicationMethod(userId: string, input: UserCreatePaymentApplicationMethodInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const paymentApplicationMethodData = await this.checkPaymentApplicationMethodExist(input.name)

        if (paymentApplicationMethodData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'PaymentApplicationMethod', 'Create', input)

    let paymentApplicationMethod = await this.data.paymentApplicationMethod.create({
      data: { 
name: input.name, 

}
, include: {payments: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PaymentApplicationMethod', 'Create', paymentApplicationMethod)

    return paymentApplicationMethod

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Payment Application Method')
    }

  }


  
  

  async userUpdatePaymentApplicationMethod(userId: string, paymentApplicationMethodId: string, input: UserUpdatePaymentApplicationMethodInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!paymentApplicationMethodId) {
        throw new BadRequestException('Payment Application Method Id is required')
      } else {

      const paymentApplicationMethodData = await this.checkPaymentApplicationMethodExist(input.name)

      if (paymentApplicationMethodData.length > 0) {
        if (paymentApplicationMethodData[0].id != paymentApplicationMethodId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'PaymentApplicationMethod', 'Update', input)

    let paymentApplicationMethod = this.data.paymentApplicationMethod.update({
      where: { id: paymentApplicationMethodId },
      data: {
name: input.name, 

}
, include: {payments: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PaymentApplicationMethod', 'Update', paymentApplicationMethod)

    return paymentApplicationMethod

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Payment Application Method')
    }
  }

  async userUpdatePaymentApplicationMethods(userId: string, input: UserUpdatePaymentApplicationMethodsInput): Promise<UpdateResult> {
    const total = input.paymentApplicationMethods.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.paymentApplicationMethods) {
      const inputData = input.paymentApplicationMethods[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const paymentApplicationMethodData = await this.checkPaymentApplicationMethodExist(inputData.name)

      if (paymentApplicationMethodData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.paymentApplicationMethod.upsert({
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


  async userDeletePaymentApplicationMethod(userId: string, paymentApplicationMethodId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!paymentApplicationMethodId) {
        throw new BadRequestException('Payment Application Method Id is required')
      } else {

        const paymentCount = await this.data.payment.count({ where: { paymentApplicationMethodId: paymentApplicationMethodId }})
        if(paymentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Payment')
        }

        await this.data.logEvent(sendingUser, true, 'PaymentApplicationMethod', 'Delete', paymentApplicationMethodId)

        let paymentApplicationMethod = this.data.paymentApplicationMethod.delete({
          where: { id: paymentApplicationMethodId }
        })

        await this.data.logEvent(sendingUser, false, 'PaymentApplicationMethod', 'Delete', paymentApplicationMethod)

        return paymentApplicationMethod

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Payment Application Method')
    }
  }
}

