
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreatePriorAuthDmeInput } from './dto/admin-create-prior-auth-dme.input'
import { AdminListPriorAuthDmeInput } from './dto/admin-list-prior-auth-dme.input'
import { AdminListPriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access'
import { AdminListDurableMedicalEquipmentInput } from '@case-clinical/api/durable-medical-equipment/data-access'
import { AdminUpdatePriorAuthDmeInput } from './dto/admin-update-prior-auth-dme.input'

@Injectable()
export class ApiPriorAuthDmeDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminPriorAuthDmes(adminId: string, input?: AdminListPriorAuthDmeInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.priorAuthDme.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {priorAuthorizationRequest: true, durableMedicalEquipment: true}
    })
  }

  async adminCountPriorAuthDmes(adminId: string, input?: AdminListPriorAuthDmeInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.priorAuthDme.count(
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

  
  

  async adminPriorAuthDme(adminId: string, priorAuthDmeId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.priorAuthDme.findUnique({ where: { id: priorAuthDmeId } , include: {priorAuthorizationRequest: true, durableMedicalEquipment: true} })
  }

  async checkPriorAuthDmeExist(priorAuthDmeName: string) {
    try {
      return this.data.priorAuthDme.findMany({ where: { name: priorAuthDmeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreatePriorAuthDme(adminId: string, input: AdminCreatePriorAuthDmeInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const priorAuthDmeData = await this.checkPriorAuthDmeExist(input.name)

      if (priorAuthDmeData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.priorAuthDme.create({
          data: { 
      
                priorAuthorizationRequest: 
                input.priorAuthId != null
                ? {
                        connect:  { 
                            id: input.priorAuthId
                        }
                    }: undefined,  
                durableMedicalEquipment: 
                input.durableMedicalEquipmentId != null
                ? {
                        connect:  { 
                            id: input.durableMedicalEquipmentId
                        }
                    }: undefined,name: input.name, 
estimatedCost: input.estimatedCost, 

    }
    , include: {priorAuthorizationRequest: true, durableMedicalEquipment: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdatePriorAuthDme(adminId: string, priorAuthDmeId, input: AdminUpdatePriorAuthDmeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.priorAuthDme.update({
      where: { id: priorAuthDmeId },
      data: {
  
                priorAuthorizationRequest: 
                input.priorAuthId != null
                ? {
                        connect:  { 
                            id: input.priorAuthId
                        }
                    }: undefined,  
                durableMedicalEquipment: 
                input.durableMedicalEquipmentId != null
                ? {
                        connect:  { 
                            id: input.durableMedicalEquipmentId
                        }
                    }: undefined,name: input.name, 
estimatedCost: input.estimatedCost, 

}
, include: {priorAuthorizationRequest: true, durableMedicalEquipment: true} 
    })
  }

  async adminDeletePriorAuthDme(adminId: string, priorAuthDmeId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.priorAuthDme.delete({ where: { id: priorAuthDmeId } })
  }
}

