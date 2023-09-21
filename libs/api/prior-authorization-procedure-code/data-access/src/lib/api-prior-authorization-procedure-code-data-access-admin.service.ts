
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreatePriorAuthorizationProcedureCodeInput } from './dto/admin-create-prior-authorization-procedure-code.input'
import { AdminListPriorAuthorizationProcedureCodeInput } from './dto/admin-list-prior-authorization-procedure-code.input'
import { AdminListCostCategoryInput } from '@case-clinical/api/cost-category/data-access'
import { AdminListProcedureInput } from '@case-clinical/api/procedure/data-access'
import { AdminListPriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access'
import { AdminUpdatePriorAuthorizationProcedureCodeInput } from './dto/admin-update-prior-authorization-procedure-code.input'

@Injectable()
export class ApiPriorAuthorizationProcedureCodeDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminPriorAuthorizationProcedureCodes(adminId: string, input?: AdminListPriorAuthorizationProcedureCodeInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationProcedureCode.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {costCategory: true, procedure: true, priorAuthorizationRequest: true}
    })
  }

  async adminCountPriorAuthorizationProcedureCodes(adminId: string, input?: AdminListPriorAuthorizationProcedureCodeInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.priorAuthorizationProcedureCode.count(
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

  
  

  async adminPriorAuthorizationProcedureCode(adminId: string, priorAuthorizationProcedureCodeId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.priorAuthorizationProcedureCode.findUnique({ where: { id: priorAuthorizationProcedureCodeId } , include: {costCategory: true, procedure: true, priorAuthorizationRequest: true} })
  }

  async checkPriorAuthorizationProcedureCodeExist(priorAuthorizationProcedureCodeName: string) {
    try {
      return this.data.priorAuthorizationProcedureCode.findMany({ where: { name: priorAuthorizationProcedureCodeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreatePriorAuthorizationProcedureCode(adminId: string, input: AdminCreatePriorAuthorizationProcedureCodeInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const priorAuthorizationProcedureCodeData = await this.checkPriorAuthorizationProcedureCodeExist(input.name)

      if (priorAuthorizationProcedureCodeData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.priorAuthorizationProcedureCode.create({
          data: { 
      
                costCategory: 
                input.costCategoryId != null
                ? {
                        connect:  { 
                            id: input.costCategoryId
                        }
                    }: undefined,  
                procedure: 
                input.procedureId != null
                ? {
                        connect:  { 
                            id: input.procedureId
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
    , include: {costCategory: true, procedure: true, priorAuthorizationRequest: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdatePriorAuthorizationProcedureCode(adminId: string, priorAuthorizationProcedureCodeId, input: AdminUpdatePriorAuthorizationProcedureCodeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.priorAuthorizationProcedureCode.update({
      where: { id: priorAuthorizationProcedureCodeId },
      data: {
  
                costCategory: 
                input.costCategoryId != null
                ? {
                        connect:  { 
                            id: input.costCategoryId
                        }
                    }: undefined,  
                procedure: 
                input.procedureId != null
                ? {
                        connect:  { 
                            id: input.procedureId
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
, include: {costCategory: true, procedure: true, priorAuthorizationRequest: true} 
    })
  }

  async adminDeletePriorAuthorizationProcedureCode(adminId: string, priorAuthorizationProcedureCodeId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.priorAuthorizationProcedureCode.delete({ where: { id: priorAuthorizationProcedureCodeId } })
  }
}

