
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListLeadSourceInput } from './dto/user-list-lead-source.input'

@Injectable()
export class ApiLeadSourceDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicLeadSources(input?: UserListLeadSourceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.leadSource.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectLeadSources(input?: UserListLeadSourceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.leadSource.findMany({
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

  async publicCountLeadSources(input?: UserListLeadSourceInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.leadSource.count(
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

  async publicLeadSource(leadSourceId) {

    return this.data.leadSource.findUnique({ where: { id: leadSourceId } , include: {leads: true}  })
  }
}


