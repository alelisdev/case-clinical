
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateDurableMedicalEquipmentInput } from './dto/user-create-durable-medical-equipment.input'
import { UserListDurableMedicalEquipmentInput } from './dto/user-list-durable-medical-equipment.input'
import { UserUpdateDurableMedicalEquipmentInput } from './dto/user-update-durable-medical-equipment.input'
import { UserUpdateDurableMedicalEquipmentsInput } from './dto/user-update-durable-medical-equipments.input'

import { UserListVendorInput } from '@case-clinical/api/vendor/data-access'

@Injectable()
export class ApiDurableMedicalEquipmentDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userDurableMedicalEquipments(userId: string, input?: UserListDurableMedicalEquipmentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.durableMedicalEquipment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            vendorId: input?.vendorId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {vendor: true}
    })
  }

  async userSelectDurableMedicalEquipments(userId: string, input?: UserListDurableMedicalEquipmentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.durableMedicalEquipment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            vendorId: input?.vendorId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountDurableMedicalEquipments(userId: string, input?: UserListDurableMedicalEquipmentInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.durableMedicalEquipment.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            vendorId: input?.vendorId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userDurableMedicalEquipment(userId: string, durableMedicalEquipmentId) {

    return this.data.durableMedicalEquipment.findUnique({ where: { id: durableMedicalEquipmentId } , include: {vendor: true, priorAuthDmes: {include: {priorAuthorizationRequest: true, durableMedicalEquipment: true}}}  })
  }

  async checkDurableMedicalEquipmentExist(durableMedicalEquipmentName: string, vendorId:string) {
    try {
      return this.data.durableMedicalEquipment.findMany({ where: { name: durableMedicalEquipmentName, vendorId:vendorId } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateDurableMedicalEquipment(userId: string, input: UserCreateDurableMedicalEquipmentInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {  

    await this.data.logEvent(sendingUser, true, 'DurableMedicalEquipment', 'Create', input)

    let durableMedicalEquipment = await this.data.durableMedicalEquipment.create({
      data: { 
  
                vendor: 
                input.vendorId != null
                ? {
                        connect:  { 
                            id: input.vendorId
                        }
                    }: undefined,name: input.name, 
itemCode: input.itemCode, 
size: input.size, 
brand: input.brand, 
itemURL: input.itemURL, 
estimatedCost: input.estimatedCost, 

}
, include: {vendor: true, priorAuthDmes: {include: {priorAuthorizationRequest: true, durableMedicalEquipment: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'DurableMedicalEquipment', 'Create', durableMedicalEquipment)

    return durableMedicalEquipment

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Durable Medical Equipment')
    }

  }


  
  

  async userUpdateDurableMedicalEquipment(userId: string, durableMedicalEquipmentId: string, input: UserUpdateDurableMedicalEquipmentInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!durableMedicalEquipmentId) {
        throw new BadRequestException('Durable Medical Equipment Id is required')
      } else { 


    await this.data.logEvent(sendingUser, true, 'DurableMedicalEquipment', 'Update', input)

    let durableMedicalEquipment = this.data.durableMedicalEquipment.update({
      where: { id: durableMedicalEquipmentId },
      data: {
  
                vendor: 
                input.vendorId != null
                ? {
                        connect:  { 
                            id: input.vendorId
                        }
                    }: undefined,name: input.name, 
itemCode: input.itemCode, 
size: input.size, 
brand: input.brand, 
itemURL: input.itemURL, 
estimatedCost: input.estimatedCost, 

}
, include: {vendor: true, priorAuthDmes: true} 
    })

    await this.data.logEvent(sendingUser, false, 'DurableMedicalEquipment', 'Update', durableMedicalEquipment)

    return durableMedicalEquipment

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Durable Medical Equipment')
    }
  }

  async userUpdateDurableMedicalEquipments(userId: string, input: UserUpdateDurableMedicalEquipmentsInput): Promise<UpdateResult> {
    const total = input.durableMedicalEquipments.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.durableMedicalEquipments) {
      const inputData = input.durableMedicalEquipments[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
itemCode: inputData.itemCode, 
vendorId: inputData.vendorId, 
size: inputData.size, 
brand: inputData.brand, 
itemURL: inputData.itemURL, 
estimatedCost: inputData.estimatedCost, 

      }

      const durableMedicalEquipmentData = await this.checkDurableMedicalEquipmentExist(inputData.name, inputData.vendorId)

      if (durableMedicalEquipmentData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.durableMedicalEquipment.upsert({
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


  async userDeleteDurableMedicalEquipment(userId: string, durableMedicalEquipmentId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!durableMedicalEquipmentId) {
        throw new BadRequestException('Durable Medical Equipment Id is required')
      } else {

        const priorAuthDmeCount = await this.data.priorAuthDme.count({ where: { durableMedicalEquipmentId: durableMedicalEquipmentId }})
        if(priorAuthDmeCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Auth Dme')
        }

        await this.data.logEvent(sendingUser, true, 'DurableMedicalEquipment', 'Delete', durableMedicalEquipmentId)

        let durableMedicalEquipment = this.data.durableMedicalEquipment.delete({
          where: { id: durableMedicalEquipmentId }
        })

        await this.data.logEvent(sendingUser, false, 'DurableMedicalEquipment', 'Delete', durableMedicalEquipment)

        return durableMedicalEquipment

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Durable Medical Equipment')
    }
  }
}

