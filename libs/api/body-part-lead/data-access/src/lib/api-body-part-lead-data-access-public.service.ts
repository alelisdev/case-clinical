
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListBodyPartLeadInput } from './dto/user-list-body-part-lead.input'

@Injectable()
export class ApiBodyPartLeadDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicBodyPartLeads(input?: UserListBodyPartLeadInput) {
    let name = input?.name ? input.name : undefined

    return this.data.bodyPartLead.findMany({
      where: {
            AND: [{
            name: { contains: name },
            leadId: input.leadId,
bodyPartId: input.bodyPartId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {lead: true, bodyPart: true}
    })
  }

  async publicSelectBodyPartLeads(input?: UserListBodyPartLeadInput) {
    let name = input?.name ? input.name : undefined

    return this.data.bodyPartLead.findMany({
      where: {
            AND: [{
            name: { contains: name },
            leadId: input.leadId,
bodyPartId: input.bodyPartId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountBodyPartLeads(input?: UserListBodyPartLeadInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.bodyPartLead.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            leadId: input.leadId,
bodyPartId: input.bodyPartId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicBodyPartLead(bodyPartLeadId) {

    return this.data.bodyPartLead.findUnique({ where: { id: bodyPartLeadId } , include: {lead: true, bodyPart: true}  })
  }
}


