
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListLeadActionInput } from './dto/user-list-lead-action.input'

@Injectable()
export class ApiLeadActionDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicLeadActions(input?: UserListLeadActionInput) {
    let name = input?.name ? input.name : undefined

    return this.data.leadAction.findMany({
      where: {
            AND: [{
            name: { contains: name },
            leadId: input.leadId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {lead: true}
    })
  }

  async publicSelectLeadActions(input?: UserListLeadActionInput) {
    let name = input?.name ? input.name : undefined

    return this.data.leadAction.findMany({
      where: {
            AND: [{
            name: { contains: name },
            leadId: input.leadId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountLeadActions(input?: UserListLeadActionInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.leadAction.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            leadId: input.leadId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicLeadAction(leadActionId) {

    return this.data.leadAction.findUnique({ where: { id: leadActionId } , include: {lead: true}  })
  }
}


