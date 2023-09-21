
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListGuidelineInput } from './dto/user-list-guideline.input'

@Injectable()
export class ApiGuidelineDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicGuidelines(input?: UserListGuidelineInput) {
    let name = input?.name ? input.name : undefined

    return this.data.guideline.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectGuidelines(input?: UserListGuidelineInput) {
    let name = input?.name ? input.name : undefined

    return this.data.guideline.findMany({
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

  async publicCountGuidelines(input?: UserListGuidelineInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.guideline.count(
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

  async publicGuideline(guidelineId) {

    return this.data.guideline.findUnique({ where: { id: guidelineId } , include: {priorAuthGuidelines: true}  })
  }
}


