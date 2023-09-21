
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateEquipmentInput } from './dto/user-create-equipment.input'
import { UserListEquipmentInput } from './dto/user-list-equipment.input'
import { UserUpdateEquipmentInput } from './dto/user-update-equipment.input'
import { UserUpdateEquipmentsInput } from './dto/user-update-equipments.input'



@Injectable()
export class ApiEquipmentDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userEquipments(userId: string, input?: UserListEquipmentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.equipment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectEquipments(userId: string, input?: UserListEquipmentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.equipment.findMany({
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

  async userCountEquipments(userId: string, input?: UserListEquipmentInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.equipment.count(
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

  async userEquipment(userId: string, equipmentId) {

    return this.data.equipment.findUnique({ where: { id: equipmentId } , include: {priorAuthorizationEquipments: {include: {equipment: true, priorAuthorizationRequest: true}}}  })
  }

  async checkEquipmentExist(equipmentName: string) {
    try {
      return this.data.equipment.findMany({ where: { name: equipmentName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateEquipment(userId: string, input: UserCreateEquipmentInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const equipmentData = await this.checkEquipmentExist(input.name)

        if (equipmentData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Equipment', 'Create', input)

    let equipment = await this.data.equipment.create({
      data: { 
name: input.name, 

}
, include: {priorAuthorizationEquipments: {include: {equipment: true, priorAuthorizationRequest: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'Equipment', 'Create', equipment)

    return equipment

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Equipment')
    }

  }


  
  

  async userUpdateEquipment(userId: string, equipmentId: string, input: UserUpdateEquipmentInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!equipmentId) {
        throw new BadRequestException('Equipment Id is required')
      } else {

      const equipmentData = await this.checkEquipmentExist(input.name)

      if (equipmentData.length > 0) {
        if (equipmentData[0].id != equipmentId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Equipment', 'Update', input)

    let equipment = this.data.equipment.update({
      where: { id: equipmentId },
      data: {
name: input.name, 

}
, include: {priorAuthorizationEquipments: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Equipment', 'Update', equipment)

    return equipment

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Equipment')
    }
  }

  async userUpdateEquipments(userId: string, input: UserUpdateEquipmentsInput): Promise<UpdateResult> {
    const total = input.equipments.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.equipments) {
      const inputData = input.equipments[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const equipmentData = await this.checkEquipmentExist(inputData.name)

      if (equipmentData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.equipment.upsert({
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


  async userDeleteEquipment(userId: string, equipmentId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!equipmentId) {
        throw new BadRequestException('Equipment Id is required')
      } else {

        const priorAuthorizationEquipmentCount = await this.data.priorAuthorizationEquipment.count({ where: { equipmentId: equipmentId }})
        if(priorAuthorizationEquipmentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it has reference at other place')
        }

        await this.data.logEvent(sendingUser, true, 'Equipment', 'Delete', equipmentId)

        let equipment = this.data.equipment.delete({
          where: { id: equipmentId }
        })

        await this.data.logEvent(sendingUser, false, 'Equipment', 'Delete', equipment)

        return equipment

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Equipment')
    }
  }
}

