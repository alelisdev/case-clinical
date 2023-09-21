
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreatePriorAuthGuidelineInput } from './dto/admin-create-prior-auth-guideline.input'
import { AdminListPriorAuthGuidelineInput } from './dto/admin-list-prior-auth-guideline.input'
import { AdminListGuidelineInput } from '@case-clinical/api/guideline/data-access'
import { AdminListPriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access'
import { AdminUpdatePriorAuthGuidelineInput } from './dto/admin-update-prior-auth-guideline.input'

@Injectable()
export class ApiPriorAuthGuidelineDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminPriorAuthGuidelines(adminId: string, input?: AdminListPriorAuthGuidelineInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.priorAuthGuideline.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {guideline: true, priorAuthorizationRequest: true}
    })
  }

  async adminCountPriorAuthGuidelines(adminId: string, input?: AdminListPriorAuthGuidelineInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.priorAuthGuideline.count(
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

  
  

  async adminPriorAuthGuideline(adminId: string, priorAuthGuidelineId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.priorAuthGuideline.findUnique({ where: { id: priorAuthGuidelineId } , include: {guideline: true, priorAuthorizationRequest: true} })
  }

  async checkPriorAuthGuidelineExist(priorAuthGuidelineName: string) {
    try {
      return this.data.priorAuthGuideline.findMany({ where: { name: priorAuthGuidelineName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreatePriorAuthGuideline(adminId: string, input: AdminCreatePriorAuthGuidelineInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const priorAuthGuidelineData = await this.checkPriorAuthGuidelineExist(input.name)

      if (priorAuthGuidelineData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.priorAuthGuideline.create({
          data: { 
      
                guideline: 
                input.guidelineId != null
                ? {
                        connect:  { 
                            id: input.guidelineId
                        }
                    }: undefined,  
                priorAuthorizationRequest: 
                input.priorAuthorizationRequestId != null
                ? {
                        connect:  { 
                            id: input.priorAuthorizationRequestId
                        }
                    }: undefined,name: input.name, 

    }
    , include: {guideline: true, priorAuthorizationRequest: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdatePriorAuthGuideline(adminId: string, priorAuthGuidelineId, input: AdminUpdatePriorAuthGuidelineInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.priorAuthGuideline.update({
      where: { id: priorAuthGuidelineId },
      data: {
  
                guideline: 
                input.guidelineId != null
                ? {
                        connect:  { 
                            id: input.guidelineId
                        }
                    }: undefined,  
                priorAuthorizationRequest: 
                input.priorAuthorizationRequestId != null
                ? {
                        connect:  { 
                            id: input.priorAuthorizationRequestId
                        }
                    }: undefined,name: input.name, 

}
, include: {guideline: true, priorAuthorizationRequest: true} 
    })
  }

  async adminDeletePriorAuthGuideline(adminId: string, priorAuthGuidelineId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.priorAuthGuideline.delete({ where: { id: priorAuthGuidelineId } })
  }
}

