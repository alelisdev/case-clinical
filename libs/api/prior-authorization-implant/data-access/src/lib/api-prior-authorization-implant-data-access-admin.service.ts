
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreatePriorAuthorizationImplantInput } from './dto/admin-create-prior-authorization-implant.input'
import { AdminListPriorAuthorizationImplantInput } from './dto/admin-list-prior-authorization-implant.input'
import { AdminListImplantInput } from '@case-clinical/api/implant/data-access'
import { AdminListPriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access'
import { AdminUpdatePriorAuthorizationImplantInput } from './dto/admin-update-prior-authorization-implant.input'

@Injectable()
export class ApiPriorAuthorizationImplantDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminPriorAuthorizationImplants(adminId: string, input?: AdminListPriorAuthorizationImplantInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationImplant.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {implant: true, priorAuthorizationRequest: true}
    })
  }

  async adminCountPriorAuthorizationImplants(adminId: string, input?: AdminListPriorAuthorizationImplantInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.priorAuthorizationImplant.count(
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

  
  

  async adminPriorAuthorizationImplant(adminId: string, priorAuthorizationImplantId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.priorAuthorizationImplant.findUnique({ where: { id: priorAuthorizationImplantId } , include: {implant: true, priorAuthorizationRequest: true} })
  }

  async checkPriorAuthorizationImplantExist(priorAuthorizationImplantName: string) {
    try {
      return this.data.priorAuthorizationImplant.findMany({ where: { name: priorAuthorizationImplantName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreatePriorAuthorizationImplant(adminId: string, input: AdminCreatePriorAuthorizationImplantInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const priorAuthorizationImplantData = await this.checkPriorAuthorizationImplantExist(input.name)

      if (priorAuthorizationImplantData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.priorAuthorizationImplant.create({
          data: { 
      
                implant: 
                input.implantId != null
                ? {
                        connect:  { 
                            id: input.implantId
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
    , include: {implant: true, priorAuthorizationRequest: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdatePriorAuthorizationImplant(adminId: string, priorAuthorizationImplantId, input: AdminUpdatePriorAuthorizationImplantInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.priorAuthorizationImplant.update({
      where: { id: priorAuthorizationImplantId },
      data: {
  
                implant: 
                input.implantId != null
                ? {
                        connect:  { 
                            id: input.implantId
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
, include: {implant: true, priorAuthorizationRequest: true} 
    })
  }

  async adminDeletePriorAuthorizationImplant(adminId: string, priorAuthorizationImplantId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.priorAuthorizationImplant.delete({ where: { id: priorAuthorizationImplantId } })
  }
}

