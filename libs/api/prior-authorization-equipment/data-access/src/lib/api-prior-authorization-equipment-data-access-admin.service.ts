
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreatePriorAuthorizationEquipmentInput } from './dto/admin-create-prior-authorization-equipment.input'
import { AdminListPriorAuthorizationEquipmentInput } from './dto/admin-list-prior-authorization-equipment.input'
import { AdminListEquipmentInput } from '@case-clinical/api/equipment/data-access'
import { AdminListPriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access'
import { AdminUpdatePriorAuthorizationEquipmentInput } from './dto/admin-update-prior-authorization-equipment.input'

@Injectable()
export class ApiPriorAuthorizationEquipmentDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminPriorAuthorizationEquipments(adminId: string, input?: AdminListPriorAuthorizationEquipmentInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationEquipment.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {equipment: true, priorAuthorizationRequest: true}
    })
  }

  async adminCountPriorAuthorizationEquipments(adminId: string, input?: AdminListPriorAuthorizationEquipmentInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.priorAuthorizationEquipment.count(
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

  
  

  async adminPriorAuthorizationEquipment(adminId: string, priorAuthorizationEquipmentId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.priorAuthorizationEquipment.findUnique({ where: { id: priorAuthorizationEquipmentId } , include: {equipment: true, priorAuthorizationRequest: true} })
  }

  async checkPriorAuthorizationEquipmentExist(priorAuthorizationEquipmentName: string) {
    try {
      return this.data.priorAuthorizationEquipment.findMany({ where: { name: priorAuthorizationEquipmentName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreatePriorAuthorizationEquipment(adminId: string, input: AdminCreatePriorAuthorizationEquipmentInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const priorAuthorizationEquipmentData = await this.checkPriorAuthorizationEquipmentExist(input.name)

      if (priorAuthorizationEquipmentData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.priorAuthorizationEquipment.create({
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

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdatePriorAuthorizationEquipment(adminId: string, priorAuthorizationEquipmentId, input: AdminUpdatePriorAuthorizationEquipmentInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.priorAuthorizationEquipment.update({
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
  }

  async adminDeletePriorAuthorizationEquipment(adminId: string, priorAuthorizationEquipmentId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.priorAuthorizationEquipment.delete({ where: { id: priorAuthorizationEquipmentId } })
  }
}

