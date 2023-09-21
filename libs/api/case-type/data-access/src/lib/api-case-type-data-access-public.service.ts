
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListCaseTypeInput } from './dto/user-list-case-type.input'

@Injectable()
export class ApiCaseTypeDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicCaseTypes(input?: UserListCaseTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.caseType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectCaseTypes(input?: UserListCaseTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.caseType.findMany({
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

  async publicCountCaseTypes(input?: UserListCaseTypeInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.caseType.count(
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

  async publicCaseType(caseTypeId) {

    return this.data.caseType.findUnique({ where: { id: caseTypeId } , include: {legalCases: true}  })
  }
}


