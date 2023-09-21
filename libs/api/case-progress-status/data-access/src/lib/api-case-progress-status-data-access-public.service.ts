
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListCaseProgressStatusInput } from './dto/user-list-case-progress-status.input'

@Injectable()
export class ApiCaseProgressStatusDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicCaseProgressStatuses(input?: UserListCaseProgressStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.caseProgressStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectCaseProgressStatuses(input?: UserListCaseProgressStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.caseProgressStatus.findMany({
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

  async publicCountCaseProgressStatuses(input?: UserListCaseProgressStatusInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.caseProgressStatus.count(
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

  async publicCaseProgressStatus(caseProgressStatusId) {

    return this.data.caseProgressStatus.findUnique({ where: { id: caseProgressStatusId } , include: {legalCases: true}  })
  }
}


