
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateGuidelineInput } from './dto/admin-create-guideline.input'
import { AdminListGuidelineInput } from './dto/admin-list-guideline.input'

import { AdminUpdateGuidelineInput } from './dto/admin-update-guideline.input'

@Injectable()
export class ApiGuidelineDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminGuidelines(adminId: string, input?: AdminListGuidelineInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.guideline.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountGuidelines(adminId: string, input?: AdminListGuidelineInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.guideline.count(
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

  
  

  async adminGuideline(adminId: string, guidelineId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.guideline.findUnique({ where: { id: guidelineId } , include: {priorAuthGuidelines: true} })
  }

  async checkGuidelineExist(guidelineName: string) {
    try {
      return this.data.guideline.findMany({ where: { name: guidelineName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateGuideline(adminId: string, input: AdminCreateGuidelineInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const guidelineData = await this.checkGuidelineExist(input.name)

      if (guidelineData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.guideline.create({
          data: { 
    name: input.name, 

    }
    , include: {priorAuthGuidelines: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateGuideline(adminId: string, guidelineId, input: AdminUpdateGuidelineInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.guideline.update({
      where: { id: guidelineId },
      data: {
name: input.name, 

}
, include: {priorAuthGuidelines: true} 
    })
  }

  async adminDeleteGuideline(adminId: string, guidelineId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.guideline.delete({ where: { id: guidelineId } })
  }
}

