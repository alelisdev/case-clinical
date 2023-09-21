
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreatePriorAuthorizationEquipmentInput } from './dto/user-create-prior-authorization-equipment.input'
import { UserListPriorAuthorizationEquipmentInput } from './dto/user-list-prior-authorization-equipment.input'
import { UserUpdatePriorAuthorizationEquipmentInput } from './dto/user-update-prior-authorization-equipment.input'
import { UserUpdatePriorAuthorizationEquipmentsInput } from './dto/user-update-prior-authorization-equipments.input'

import { UserListEquipmentInput } from '@case-clinical/api/equipment/data-access'
import { UserListPriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access'

@Injectable()
export class ApiPriorAuthorizationEquipmentDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userPriorAuthorizationEquipments(userId: string, input?: UserListPriorAuthorizationEquipmentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationEquipment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            equipmentId: input?.equipmentId,
priorAuthorizationRequestId: input?.priorAuthorizationRequestId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {equipment: true, priorAuthorizationRequest: true}
    })
  }

  async userSelectPriorAuthorizationEquipments(userId: string, input?: UserListPriorAuthorizationEquipmentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationEquipment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            equipmentId: input?.equipmentId,
priorAuthorizationRequestId: input?.priorAuthorizationRequestId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountPriorAuthorizationEquipments(userId: string, input?: UserListPriorAuthorizationEquipmentInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.priorAuthorizationEquipment.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            equipmentId: input?.equipmentId,
priorAuthorizationRequestId: input?.priorAuthorizationRequestId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userPriorAuthorizationEquipment(userId: string, priorAuthorizationEquipmentId) {

    return this.data.priorAuthorizationEquipment.findUnique({ where: { id: priorAuthorizationEquipmentId } , include: {equipment: true, priorAuthorizationRequest: true}  })
  }

  async checkPriorAuthorizationEquipmentExist(priorAuthorizationEquipmentName: string) {
    try {
      return this.data.priorAuthorizationEquipment.findMany({ where: { name: priorAuthorizationEquipmentName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreatePriorAuthorizationEquipment(userId: string, input: UserCreatePriorAuthorizationEquipmentInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const priorAuthorizationEquipmentData = await this.checkPriorAuthorizationEquipmentExist(input.name)

        if (priorAuthorizationEquipmentData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'PriorAuthorizationEquipment', 'Create', input)

    let priorAuthorizationEquipment = await this.data.priorAuthorizationEquipment.create({
      data: { 
  
                equipment: 
                input.equipmentId != null
                ? {
                        connect:  { 
                            id: input.equipmentId
                        }
                    }: undefined,  
                priorAuthorizationRequest: 
                input.priorAuthorizationRequestId != null
                ? {
                        connect:  { 
                            id: input.priorAuthorizationRequestId
                        }
                    }: undefined,name: input.name, 
estimatedCost: input.estimatedCost, 

}
, include: {equipment: true, priorAuthorizationRequest: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PriorAuthorizationEquipment', 'Create', priorAuthorizationEquipment)

    return priorAuthorizationEquipment

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Prior Authorization Equipment')
    }

  }


  
  

  async userUpdatePriorAuthorizationEquipment(userId: string, priorAuthorizationEquipmentId: string, input: UserUpdatePriorAuthorizationEquipmentInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!priorAuthorizationEquipmentId) {
        throw new BadRequestException('Prior Authorization Equipment Id is required')
      } else {

      const priorAuthorizationEquipmentData = await this.checkPriorAuthorizationEquipmentExist(input.name)

      if (priorAuthorizationEquipmentData.length > 0) {
        if (priorAuthorizationEquipmentData[0].id != priorAuthorizationEquipmentId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'PriorAuthorizationEquipment', 'Update', input)

    let priorAuthorizationEquipment = this.data.priorAuthorizationEquipment.update({
      where: { id: priorAuthorizationEquipmentId },
      data: {
  
                equipment: 
                input.equipmentId != null
                ? {
                        connect:  { 
                            id: input.equipmentId
                        }
                    }: undefined,  
                priorAuthorizationRequest: 
                input.priorAuthorizationRequestId != null
                ? {
                        connect:  { 
                            id: input.priorAuthorizationRequestId
                        }
                    }: undefined,name: input.name, 
estimatedCost: input.estimatedCost, 

}
, include: {equipment: true, priorAuthorizationRequest: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PriorAuthorizationEquipment', 'Update', priorAuthorizationEquipment)

    return priorAuthorizationEquipment

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Prior Authorization Equipment')
    }
  }

  async userUpdatePriorAuthorizationEquipments(userId: string, input: UserUpdatePriorAuthorizationEquipmentsInput): Promise<UpdateResult> {
    const total = input.priorAuthorizationEquipments.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.priorAuthorizationEquipments) {
      const inputData = input.priorAuthorizationEquipments[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
estimatedCost: inputData.estimatedCost, 
equipmentId: inputData.equipmentId, 
priorAuthorizationRequestId: inputData.priorAuthorizationRequestId, 

      }

      const priorAuthorizationEquipmentData = await this.checkPriorAuthorizationEquipmentExist(inputData.name)

      if (priorAuthorizationEquipmentData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.priorAuthorizationEquipment.upsert({
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


  async userDeletePriorAuthorizationEquipment(userId: string, priorAuthorizationEquipmentId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!priorAuthorizationEquipmentId) {
        throw new BadRequestException('Prior Authorization Equipment Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'PriorAuthorizationEquipment', 'Delete', priorAuthorizationEquipmentId)

        let priorAuthorizationEquipment = this.data.priorAuthorizationEquipment.delete({
          where: { id: priorAuthorizationEquipmentId }
        })

        await this.data.logEvent(sendingUser, false, 'PriorAuthorizationEquipment', 'Delete', priorAuthorizationEquipment)

        return priorAuthorizationEquipment

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Prior Authorization Equipment')
    }
  }
}

