
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListCaseStatusInput } from './dto/user-list-case-status.input'

@Injectable()
export class ApiCaseStatusDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicCaseStatuses(input?: UserListCaseStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.caseStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectCaseStatuses(input?: UserListCaseStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.caseStatus.findMany({
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

  async publicCountCaseStatuses(input?: UserListCaseStatusInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.caseStatus.count(
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

  async publicCaseStatus(caseStatusId) {

    return this.data.caseStatus.findUnique({ where: { id: caseStatusId } , include: {legalCases: true}  })
  }
}


