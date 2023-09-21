
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListLeadInjuryInput } from './dto/user-list-lead-injury.input'

@Injectable()
export class ApiLeadInjuryDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicLeadInjuries(input?: UserListLeadInjuryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.leadInjury.findMany({
      where: {
            AND: [{
            name: { contains: name },
            leadId: input.leadId,
severityId: input.severityId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {lead: true, severity: true}
    })
  }

  async publicSelectLeadInjuries(input?: UserListLeadInjuryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.leadInjury.findMany({
      where: {
            AND: [{
            name: { contains: name },
            leadId: input.leadId,
severityId: input.severityId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountLeadInjuries(input?: UserListLeadInjuryInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.leadInjury.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            leadId: input.leadId,
severityId: input.severityId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicLeadInjury(leadInjuryId) {

    return this.data.leadInjury.findUnique({ where: { id: leadInjuryId } , include: {injuries: true, lead: true, severity: true}  })
  }
}


