
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListMedLevelInput } from './dto/user-list-med-level.input'

@Injectable()
export class ApiMedLevelDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicMedLevels(input?: UserListMedLevelInput) {
    let name = input?.name ? input.name : undefined

    return this.data.medLevel.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectMedLevels(input?: UserListMedLevelInput) {
    let name = input?.name ? input.name : undefined

    return this.data.medLevel.findMany({
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

  async publicCountMedLevels(input?: UserListMedLevelInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.medLevel.count(
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

  async publicMedLevel(medLevelId) {

    return this.data.medLevel.findUnique({ where: { id: medLevelId } , include: {legalCases: true, requiredFields: true}  })
  }
}


