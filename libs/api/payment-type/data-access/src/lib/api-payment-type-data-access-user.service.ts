
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreatePaymentTypeInput } from './dto/user-create-payment-type.input'
import { UserListPaymentTypeInput } from './dto/user-list-payment-type.input'
import { UserUpdatePaymentTypeInput } from './dto/user-update-payment-type.input'
import { UserUpdatePaymentTypesInput } from './dto/user-update-payment-types.input'



@Injectable()
export class ApiPaymentTypeDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userPaymentTypes(userId: string, input?: UserListPaymentTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.paymentType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectPaymentTypes(userId: string, input?: UserListPaymentTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.paymentType.findMany({
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

  async userCountPaymentTypes(userId: string, input?: UserListPaymentTypeInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.paymentType.count(
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

  async userPaymentType(userId: string, paymentTypeId) {

    return this.data.paymentType.findUnique({ where: { id: paymentTypeId } , include: {payments: {include: {batchControl: true, bank: true, payorType: true, paymentType: true, paymentApplicationMethod: true}}}  })
  }

  async checkPaymentTypeExist(paymentTypeName: string) {
    try {
      return this.data.paymentType.findMany({ where: { name: paymentTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreatePaymentType(userId: string, input: UserCreatePaymentTypeInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const paymentTypeData = await this.checkPaymentTypeExist(input.name)

        if (paymentTypeData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'PaymentType', 'Create', input)

    let paymentType = await this.data.paymentType.create({
      data: { 
name: input.name, 

}
, include: {payments: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PaymentType', 'Create', paymentType)

    return paymentType

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Payment Type')
    }

  }


  
  

  async userUpdatePaymentType(userId: string, paymentTypeId: string, input: UserUpdatePaymentTypeInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!paymentTypeId) {
        throw new BadRequestException('Payment Type Id is required')
      } else {

      const paymentTypeData = await this.checkPaymentTypeExist(input.name)

      if (paymentTypeData.length > 0) {
        if (paymentTypeData[0].id != paymentTypeId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'PaymentType', 'Update', input)

    let paymentType = this.data.paymentType.update({
      where: { id: paymentTypeId },
      data: {
name: input.name, 

}
, include: {payments: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PaymentType', 'Update', paymentType)

    return paymentType

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Payment Type')
    }
  }

  async userUpdatePaymentTypes(userId: string, input: UserUpdatePaymentTypesInput): Promise<UpdateResult> {
    const total = input.paymentTypes.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.paymentTypes) {
      const inputData = input.paymentTypes[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const paymentTypeData = await this.checkPaymentTypeExist(inputData.name)

      if (paymentTypeData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.paymentType.upsert({
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


  async userDeletePaymentType(userId: string, paymentTypeId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!paymentTypeId) {
        throw new BadRequestException('Payment Type Id is required')
      } else {

        const paymentCount = await this.data.payment.count({ where: { paymentTypeId: paymentTypeId }})
        if(paymentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Payment')
        }

        await this.data.logEvent(sendingUser, true, 'PaymentType', 'Delete', paymentTypeId)

        let paymentType = this.data.paymentType.delete({
          where: { id: paymentTypeId }
        })

        await this.data.logEvent(sendingUser, false, 'PaymentType', 'Delete', paymentType)

        return paymentType

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Payment Type')
    }
  }
}

