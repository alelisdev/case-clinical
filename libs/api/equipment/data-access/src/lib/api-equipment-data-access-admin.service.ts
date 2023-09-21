
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateEquipmentInput } from './dto/admin-create-equipment.input'
import { AdminListEquipmentInput } from './dto/admin-list-equipment.input'

import { AdminUpdateEquipmentInput } from './dto/admin-update-equipment.input'

@Injectable()
export class ApiEquipmentDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminEquipments(adminId: string, input?: AdminListEquipmentInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.equipment.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountEquipments(adminId: string, input?: AdminListEquipmentInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.equipment.count(
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

  
  

  async adminEquipment(adminId: string, equipmentId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.equipment.findUnique({ where: { id: equipmentId } , include: {priorAuthorizationEquipments: true} })
  }

  async checkEquipmentExist(equipmentName: string) {
    try {
      return this.data.equipment.findMany({ where: { name: equipmentName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateEquipment(adminId: string, input: AdminCreateEquipmentInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const equipmentData = await this.checkEquipmentExist(input.name)

      if (equipmentData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.equipment.create({
          data: { 
    name: input.name, 

    }
    , include: {priorAuthorizationEquipments: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateEquipment(adminId: string, equipmentId, input: AdminUpdateEquipmentInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.equipment.update({
      where: { id: equipmentId },
      data: {
name: input.name, 

}
, include: {priorAuthorizationEquipments: true} 
    })
  }

  async adminDeleteEquipment(adminId: string, equipmentId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.equipment.delete({ where: { id: equipmentId } })
  }
}

