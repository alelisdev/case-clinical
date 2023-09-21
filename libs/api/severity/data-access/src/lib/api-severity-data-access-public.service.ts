
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListSeverityInput } from './dto/user-list-severity.input'

@Injectable()
export class ApiSeverityDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicSeverities(input?: UserListSeverityInput) {
    let name = input?.name ? input.name : undefined

    return this.data.severity.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectSeverities(input?: UserListSeverityInput) {
    let name = input?.name ? input.name : undefined

    return this.data.severity.findMany({
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

  async publicCountSeverities(input?: UserListSeverityInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.severity.count(
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

  async publicSeverity(severityId) {

    return this.data.severity.findUnique({ where: { id: severityId } , include: {leads: true}  })
  }
}


