
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreatePayorTypeInput } from './dto/user-create-payor-type.input'
import { UserListPayorTypeInput } from './dto/user-list-payor-type.input'
import { UserUpdatePayorTypeInput } from './dto/user-update-payor-type.input'
import { UserUpdatePayorTypesInput } from './dto/user-update-payor-types.input'



@Injectable()
export class ApiPayorTypeDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userPayorTypes(userId: string, input?: UserListPayorTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.payorType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectPayorTypes(userId: string, input?: UserListPayorTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.payorType.findMany({
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

  async userCountPayorTypes(userId: string, input?: UserListPayorTypeInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.payorType.count(
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

  async userPayorType(userId: string, payorTypeId) {

    return this.data.payorType.findUnique({ where: { id: payorTypeId } , include: {payments: {include: {batchControl: true, bank: true, payorType: true, paymentType: true, paymentApplicationMethod: true}}}  })
  }

  async checkPayorTypeExist(payorTypeName: string) {
    try {
      return this.data.payorType.findMany({ where: { name: payorTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreatePayorType(userId: string, input: UserCreatePayorTypeInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const payorTypeData = await this.checkPayorTypeExist(input.name)

        if (payorTypeData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'PayorType', 'Create', input)

    let payorType = await this.data.payorType.create({
      data: { 
name: input.name, 

}
, include: {payments: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PayorType', 'Create', payorType)

    return payorType

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Payor Type')
    }

  }


  
  

  async userUpdatePayorType(userId: string, payorTypeId: string, input: UserUpdatePayorTypeInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!payorTypeId) {
        throw new BadRequestException('Payor Type Id is required')
      } else {

      const payorTypeData = await this.checkPayorTypeExist(input.name)

      if (payorTypeData.length > 0) {
        if (payorTypeData[0].id != payorTypeId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'PayorType', 'Update', input)

    let payorType = this.data.payorType.update({
      where: { id: payorTypeId },
      data: {
name: input.name, 

}
, include: {payments: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PayorType', 'Update', payorType)

    return payorType

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Payor Type')
    }
  }

  async userUpdatePayorTypes(userId: string, input: UserUpdatePayorTypesInput): Promise<UpdateResult> {
    const total = input.payorTypes.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.payorTypes) {
      const inputData = input.payorTypes[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const payorTypeData = await this.checkPayorTypeExist(inputData.name)

      if (payorTypeData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.payorType.upsert({
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


  async userDeletePayorType(userId: string, payorTypeId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!payorTypeId) {
        throw new BadRequestException('Payor Type Id is required')
      } else {

        const paymentCount = await this.data.payment.count({ where: { payorTypeId: payorTypeId }})
        if(paymentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Payment')
        }

        await this.data.logEvent(sendingUser, true, 'PayorType', 'Delete', payorTypeId)

        let payorType = this.data.payorType.delete({
          where: { id: payorTypeId }
        })

        await this.data.logEvent(sendingUser, false, 'PayorType', 'Delete', payorType)

        return payorType

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Payor Type')
    }
  }
}

