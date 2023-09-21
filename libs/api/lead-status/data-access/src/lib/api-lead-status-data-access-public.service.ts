
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListLeadStatusInput } from './dto/user-list-lead-status.input'

@Injectable()
export class ApiLeadStatusDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicLeadStatuses(input?: UserListLeadStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.leadStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectLeadStatuses(input?: UserListLeadStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.leadStatus.findMany({
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

  async publicCountLeadStatuses(input?: UserListLeadStatusInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.leadStatus.count(
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

  async publicLeadStatus(leadStatusId) {

    return this.data.leadStatus.findUnique({ where: { id: leadStatusId } , include: {leads: true}  })
  }
}


