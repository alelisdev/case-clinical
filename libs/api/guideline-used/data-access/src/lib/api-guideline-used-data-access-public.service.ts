
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListGuidelineUsedInput } from './dto/user-list-guideline-used.input'

@Injectable()
export class ApiGuidelineUsedDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicGuidelineUseds(input?: UserListGuidelineUsedInput) {
    let name = input?.name ? input.name : undefined

    return this.data.guidelineUsed.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectGuidelineUseds(input?: UserListGuidelineUsedInput) {
    let name = input?.name ? input.name : undefined

    return this.data.guidelineUsed.findMany({
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

  async publicCountGuidelineUseds(input?: UserListGuidelineUsedInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.guidelineUsed.count(
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

  async publicGuidelineUsed(guidelineUsedId) {

    return this.data.guidelineUsed.findUnique({ where: { id: guidelineUsedId } , include: {priorAuthorizationRequests: true}  })
  }
}


