
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateGuidelineUsedInput } from './dto/admin-create-guideline-used.input'
import { AdminListGuidelineUsedInput } from './dto/admin-list-guideline-used.input'

import { AdminUpdateGuidelineUsedInput } from './dto/admin-update-guideline-used.input'

@Injectable()
export class ApiGuidelineUsedDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminGuidelineUseds(adminId: string, input?: AdminListGuidelineUsedInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.guidelineUsed.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountGuidelineUseds(adminId: string, input?: AdminListGuidelineUsedInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.guidelineUsed.count(
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

  
  

  async adminGuidelineUsed(adminId: string, guidelineUsedId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.guidelineUsed.findUnique({ where: { id: guidelineUsedId } , include: {priorAuthorizationRequests: true} })
  }

  async checkGuidelineUsedExist(guidelineUsedName: string) {
    try {
      return this.data.guidelineUsed.findMany({ where: { name: guidelineUsedName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateGuidelineUsed(adminId: string, input: AdminCreateGuidelineUsedInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const guidelineUsedData = await this.checkGuidelineUsedExist(input.name)

      if (guidelineUsedData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.guidelineUsed.create({
          data: { 
    name: input.name, 

    }
    , include: {priorAuthorizationRequests: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateGuidelineUsed(adminId: string, guidelineUsedId, input: AdminUpdateGuidelineUsedInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.guidelineUsed.update({
      where: { id: guidelineUsedId },
      data: {
name: input.name, 

}
, include: {priorAuthorizationRequests: true} 
    })
  }

  async adminDeleteGuidelineUsed(adminId: string, guidelineUsedId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.guidelineUsed.delete({ where: { id: guidelineUsedId } })
  }
}

